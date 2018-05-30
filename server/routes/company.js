// In this file, i willl define our routes for the application
//Import libraries to be used 
const express = require('express');
const router = express.Router();
const db = require('../db/queries');

// const passport = require('../auth/local');
// const { loginRequired } = require("../auth/helpers");


router.post('/new', db.createUserCompany);
/* GET all companies */
// router.get('/all', function(req, res, next) {
//     db.any("SELECT * FROM company")
//     .then(data => {
//       res.json(data);
//     })
//     .catch (err => console.log (err));
//   });
  

// POST "/company/user:id": 
//Gets all employees for a particular company (contained in the request body).
/* GET users listing. */
// router.get('/', loginRequired, db.getAllUsers);
// router.get('/:user_id', loginRequired, db.getSingleUser);


//We are going to do the same thing for the remaining routes.
// router.post('/new', db.createUser);
// router.post('/login', passport.authenticate("local", {}), db.loginUser);
// router.post('/logout', loginRequired, db.logoutUser);


module.exports = router;

//NOTES:
//to import into another file
//The keyword require is used in Node.js to import modules
// main.js / var greetings = require("./greetings.js");
//We can now access the publicly available methods of greetings.js as a property of our greetings variable in main.js.
// main.js
//var greetings = require("./greetings.js");

// "Hello"
//greetings.sayHelloInEnglish();