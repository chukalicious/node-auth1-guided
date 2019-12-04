const router = require('express').Router();

//----------------------------------------------------------------------------//
// We have nested routers. The router that is exported from this file (see the
// const router statement above, and the module.exports statement below) is
// bound in server.js to /api.
// 
// The routers that are exported from ../auth/auth-router.js and
// ../users/users-router.js are bound to the subroutes /auth and /users
// (respectively) below in the router.use() statements. 
// 
// Remember that router.use() does the same thing as server.use() - it adds a
// router or middleware function to the chain for the root url. For the server,
// the root url is '/'. For the router exported from this file, the root url is
// /api (the url it's bound to in server.js). 
// 
// The subroutes specified below are therefore subroutes to this router's root
// url, which is /api. So, authRouter is bound to /api/auth, and usersRouter is
// bound to /api/users. 
//----------------------------------------------------------------------------//

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

// /api/auth
router.use('/auth', authRouter);
// /api/users
router.use('/users', usersRouter);

// /api
router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
