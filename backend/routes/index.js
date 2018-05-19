// In this file, i willl define routes for the application
//Import libraries to be used 

// const express = require('express');
// const router = express.Router(); The format below is the same as here and above
const router = require('express').Router();

// const routes = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;
