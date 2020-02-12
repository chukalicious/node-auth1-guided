const express = require('express');

//----------------------------------------------------------------------------//
// This project is modularized into routers. Here, we get a router object that
// is exported from ./api-router.js, and bind it to the /api url.
// 
// In addition, a method is exported from ./configure-middleware.js, which takes
// an express server object, and calls server.use() with a number of 3rd party
// middleware providers. We could do the server.use() calls here... this just
// makes the code a little cleaner.
//----------------------------------------------------------------------------//

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;
