const express = require ('express'); //import express
const logger = require ('morgan');
const path = require ('path'); 
const app= express (); // create an express server
const port = 8000; 


app.use(logger('dev'));

app.use('/companies',companies);
app.use('/company',company);
app.use('/users', users);

app.get ('/', (req, res)=>{
    res.send('Hello World!');
});



app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
});