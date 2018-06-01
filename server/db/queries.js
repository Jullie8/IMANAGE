let db = require('./db_info.js');

// const authHelpers = require("../auth/helpers");
// const passport = require("../auth/local");

function createUserCompany(req, res, next) {
  // const hash = authHelpers.createHash(req.body.password);
  console.log("this is the req.body:")
  console.log(req.body.companyName)
  db.none('INSERT INTO company (company_name) VALUES (${companyName})',{companyName:req.body.companyName})
    .then(() => {
      res.status(200)
         .json({
           message: "Registration successful."
         })
    })
   
    console.log(req.body.companyName)
    console.log(req.body.fullName)
    console.log("Hey I am the password:" + req.body.password)
    console.log("Hey I am the email:" + req.body.email)

    // db.any('INSERT INTO users (employed_by, full_name, password_digest, email, user_type) VALUES ((SELECT id FROM company WHERE company_name = ${companyName}), ${fullName}, ${password}, ${email}, ${user_type})', {companyName:req.body.companyName, fullName:req.body.fullName, password:req.body.password, email:req.body.email, user_type:"admin"})
    db.any('INSERT INTO users (employed_by, full_name, password_digest, user_type, email) VALUES ((SELECT id FROM company WHERE company_name = ${companyName}), ${fullName}, ${password}, ${user_type}, ${email})', {companyName:req.body.companyName, fullName:req.body.fullName, password:req.body.password, user_type:"admin", email:req.body.email})
    .then((data)=>{
      // console.log(data.data)
        res.status(200)
        .json({
          message: "Registration successful."

        })
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
         .json({
           //window alert to make the error pop up 
           message: err
         })
    })
}


  module.exports = {
      createUserCompany
  }

//   WITH ins1 AS (
//    INSERT INTO sample(firstname, lastname)
//    VALUES ('fai55', 'shaggk')
// -- ON     CONFLICT DO NOTHING                -- optional addition in Postgres 9.5+
//    RETURNING id AS user_id
//    )
// , ins2 AS (
//    INSERT INTO sample1 (user_id, adddetails)
//    SELECT user_id, 'ss' FROM ins1
//    -- RETURNING user_id                      -- only if used in turn
//    )
// INSERT INTO sample2 (user_id, value)         -- same here
// SELECT user_id, 'ss' FROM ins1;