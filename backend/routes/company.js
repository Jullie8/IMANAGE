// In this file, i willl define our routes for the application
//Import libraries to be used 
const express = require('express');
const router = express.Router();

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




//We are going to do the same thing for the remaining routes.
router.get('/login', (req, res) => {
    res.send('You are on the company login page');
});

router.get('/logout', (req, res) => {
    res.send('You are on the company logout page');
});



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