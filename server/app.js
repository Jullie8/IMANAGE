//this file will be the entry point into my app
const express = require ('express'); //import express
const path = require ('path'); 
const logger = require ('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');



// We are using the dotenv library to load our environmental variables from the .env file. 
// We don't have anything in the .env file for now will store app session secret, api keys etc.
dotenv.load();//=> is the same as dotenv.cofig


//Just like external libraries, we can import our application code using the require function. 
//The major difference is that we have to give the exact path to our file. 
//We saw in the directory structure section that we will have an index.js file in a routes directory.
var routes = require('./routes/index');
var company= require('./routes/company');
var users = require('./routes/users');
// var company = require('./routes/company'); will need this later



// This line of code instantiates the Express JS framework. 
// Assigns it to a variable called app and will add our configuration to this variable.
const app= express(); 
const port = 3100; 

// The .use method is similar to the .set method, where it allows us to set further configurations. 
//The .use method also acts as a chain of events that will take place once a request hits our Node.js application. 
//First we'll log the request data, parse any incoming data, and so on.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: "\x02\xf3\xf7r\t\x9f\xee\xbbu\xb1\xe1\x90\xfe'\xab\xa6L6\xdd\x8d[\xccO\xfe",
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/public',express.static(path.join(__dirname, 'public')));//Serves resources from public folder
  

// We add our routes just after the express.static statement to link the routes we defined to our app.
app.use('/', routes);
app.use('/company', company);
app.use('/users', users);



// catch 404 and forward to error handler handlers aka callback func
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler - // If our application encounters an error, we'll display the error and stack trace accordingly.
app.use((err,req,res,next)=>{
    res.status(err.status|| 500);
    res.render('error', {
        message:err.message,
        error:err
    });
});

//have app listen on pot 4000 which means once we launch our app wr will be able to navigate to localhost:4000 and see app in action 3000 is the lowest port number that can be used
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
});

// module.exports = app;

//notes:

//Node.js provides by default a very low level HTTP module. That's why you need "frameworks" like Express and such - they let you easily handle common features of web servers in other platforms (like Java and PHP, for example).

//The cookie parser parses cookies and puts the cookie information on req object in the middleware. It will also decrypt signed cookies provided you know the secret.