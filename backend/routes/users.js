// In this file, i willl define our routes for the application
//Import libraries to be used 

const express = require('express');
const router = express.Router();

// On our router variable, we'll be able to include various methods. 
//For our app we'll only make use of GET requests, 
//so the method router.get will handle that interaction.
//This method takes a string as its first parameter and that is the URL path, so for the first route, we are just giving it '/', which means the default route.

router.get ('/', (req, res)=>{
    res.send('You are on the home page');
});

//We are going to do the same thing for the remaining routes.
router.get('/login', (req, res) => {
    res.send('You are on the login page');
});

router.get('/logout', (req, res) => {
    res.send('You are on the logout page');
});

router.get('/user', (req, res) => {
    res.send('You are on the user page');
});


// Finally, we export this module so that we can import it in our app.js file 
//and gain access to the routes we defined.
module.exports = router;


//notes
//routing in Express works. 
//When we define a route, say our /user route, and pass the callback function, 
//we are telling Express that when the browser points to localhost:3000/user, the specified callback function will be called.
//Calling next will exit the current function and move down the middleware stack.

//The way requests are processed in Express Js is that they go through a stack of functions. At the end of each function, you can either call next to go the next function in the stack, or call res and send a response to the browser.