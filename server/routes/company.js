// In this file, i willl define our routes for the application
//Import libraries to be used 

const express = require('express');
const router = express.Router();
const db = require('../db/queries');

const passport = require('../auth/local');
const { loginRequired } = require("../auth/helpers");

function test(req, res, next) {
    console.log(req.body);
    next();
}

router.get('/getAllCompanies', db.getAllCompanies);
router.get('/getAllBusinessOwners', db.getAllCompanyOwners);
router.get('/:id/getSingleBusinessOwner', db.getSingleCompanyOwnerAccountInfoById);
router.post('/new', db.createCompanyAccount), 
router.post('/login', passport.authenticate("local",{}), db.loginUser);
router.post('/logout', loginRequired, db.logoutUser);
router.post('/addCompanyEmployee', db.addEmployee);

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