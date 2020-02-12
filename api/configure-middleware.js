const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//----------------------------------------------------------------------------//
// This module exports a method that takes an express server as a parameter, and
// uses it to add various 3rd party middleware methods to it.
// 
// This is one method for helping your code to stay clean, but is not requried.
//----------------------------------------------------------------------------//

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
