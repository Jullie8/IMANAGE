let db = require('./db_info.js');

const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");
//Responses from within a middleware function can be in any format that you prefer, such as an HTML error page, a simple message, or a JSON string.

//ON: company/getAllCompanies - Route
function getAllCompanies(req, res, next) {
  db
    .any("SELECT * FROM company")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved All companies"
      });
    })
    .catch(function(err) {
      console.log(err)
      return next(err);
    });
}

//ON:company/getAllCompanyOwners - route
function getAllCompanyOwners(req, res, next) {  
  db.any("SELECT company.id, full_name, password_digest, user_type, activated_user, username FROM users JOIN company ON users.employed_by=company.id")
    .then(function(data){
      res.status(200).json({
        status: "success",
        data:data,
        message: 'Retrieved All Company Owners'
      })
    })
    .catch(function(err){
      console.log(err)
      return next(err);
    })
}

//this gets the single businessowner account by company ID
function getSingleCompanyOwnerAccountInfoById (req, res, next) {
  db.any('SELECT company.id, full_name, password_digest, user_type, activated_user, username FROM users JOIN company ON users.employed_by=company.id WHERE users.employed_by=${id}', 
    {id: req.params.id})
    .then(function(data){
      res.status(200).json({
        status:"success",
        data:data,
        message:"Retrived Single Business Owner Account"
      });
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).send("Received an error for that owners account info" + err);
    })
}

// //ON: company/new - route
function createCompanyAccount(req, res, next) {
  // req.body.companyName;
  // req.body.password;
  const hash = authHelpers.createHash(req.body.password);
  console.log(req.body)
  db.none('INSERT INTO company (company_name) VALUES (${companyName})',{companyName:req.body.companyName})
  .then(() => {
  db.any('INSERT INTO users (employed_by, full_name, password_digest, user_type, activated_user, username) VALUES ((SELECT id FROM company WHERE company_name = ${companyName}), ${fullName}, ${password}, ${user_type}, ${activated_user}, ${username})', {companyName:req.body.companyName, fullName:req.body.fullName, password:hash, user_type:"admin", activated_user: true, username:req.body.username})
  })  
  .then((data) => {
      res.status(200).json({
           status: "success",
           data: data,
           message: "Company Registered successfully."
         });
    }) 
     .catch(function(err) {
       res.status(500).json({
         status:'error',
         error:err
       })
    });
}



function loginUser(req, res) {
  res.json(req.user);
};


//Passport exposes a logout() function on req (also aliased as logOut())
//that can be called from any route handler which needs to terminate a login session.
//Invoking logout() will remove the req.user property and clear the login session (if any).

function logoutUser(req, res, next) {
  req.logout();
  //res.redirect('/');
  res.status(200).send("log out success");
}
  module.exports = {
    getAllCompanies:getAllCompanies,
    getAllCompanyOwners: getAllCompanyOwners,
    getSingleCompanyOwnerAccountInfoById: getSingleCompanyOwnerAccountInfoById,
    createCompanyAccount: createCompanyAccount,
    loginUser: loginUser,
    logoutUser: logoutUser
  } 

