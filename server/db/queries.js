let db = require('./db_info.js');

const sendEmail = require('../emailUtil');

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

//ON: company/new - route
function createCompanyAccount(req, res, next){
    // console.log(req.body);
  // req.body.password;
  const hash = authHelpers.createHash(req.body.password);
  // console.log(req.body)
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

function loginUser(req, res, next) {
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

// createEmployeeUser
//ON: employees/getAllEmployees - Route
function getAllEmployees(req, res, next) {
  db
    .any("SELECT * FROM users")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved All employee users"
      });
    })
    .catch(function(err) {
      console.log(err)
      return next(err);
    });
}

//company adds an employee sends welcome email to the employee
//TO DO:  Add activation link/ route
//TO DO: Fix undefined output viewed on email for companyName
function addEmployee(req, res, next) {
  // req.body.companyName;
  // req.body.password;
  console.log(req.body)
  //db.none('INSERT INTO users (employed_by, full_name, password_digest, user_type, activated_user, username) VALUES ((SELECT id FROM company WHERE company_name = ${companyName}), ${fullName}, ${password}, ${user_type}, ${activated_user}, ${username})', {companyName:req.body.companyName, fullName:req.body.fullName, password:hash, user_type:"admin", activated_user: true, username:req.body.username})
  db
    .one('INSERT INTO users (employed_by, full_name, user_type, activated_user, username) VALUES (${employed_by}, ${fullName},${user_type}, ${activated_user}, ${username}) RETURNING id', {employed_by:req.body.employed_by, companyName:req.body.companyName, fullName:req.body.fullName, user_type:req.body.user_type, activated_user: false, username:req.body.username})
    .then(({id}) => db.one('SELECT users.id FROM users where id=$1',[id]))
    .then((data) => {
      // Send email
      console.log('addEmployee', data);
      const message = {
        subject: 'Hello '+req.body.fullName,
        html: `${req.body.fullName}, welcome to <strong>${data.company_name}</strong>. Click 
        <a href="http://localhost:3100/employees/${data.id}/activate">here</a> to complete registration.
        `
      };
      sendEmail('jullissalema@c4q.nyc', req.body.username, message);
      console.log('addEmployee.here')
      // Then respond to server
      res.status(200).json({
           status: "success",
           data: data,
           message: "Employee Registered and Email sent successfully."
      });
    }) 
     .catch(function(err) {
       console.log('addEmployee', err);
       res.status(500).json({
       status:'error',
       error:err
       })
    });
}

// get single user account by id
function getSingleUser(req,res,next){
  db.one('SELECT users.id, company.company_name, users.full_name, users.activated_user AS activated_user, users.username FROM users Join company on company.id=users.employed_by where employed_by= $1',[req.params.id])
 .then(data => {
     res.json(data);
 })
 .catch(error => {
  console.log(error)
     res.json(error);
 })
 }
//enable 


  module.exports = {
    getAllCompanies:getAllCompanies,
    getAllCompanyOwners: getAllCompanyOwners,
    getSingleCompanyOwnerAccountInfoById: getSingleCompanyOwnerAccountInfoById,
    createCompanyAccount: createCompanyAccount,
    loginUser: loginUser,
    logoutUser: logoutUser,
    getAllEmployees: getAllEmployees,
    addEmployee,
    getSingleUser: getSingleUser
  } 

