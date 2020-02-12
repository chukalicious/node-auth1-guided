const router = require('express').Router();
// const bcrypt = require('bcryptjs'); - used in auth-required-middleware.js
const Users = require('./users-model.js');
// we bring in the validation middleware and assign the exported method to a
// constant called "authrequred", so we can use it to protect any handlers that
// need an authenticated user. Note that we are not doing ANYTHING about
// authorization in this sample project... If you exist, and can prove you are
// you by knowing your password, you can do All The Things(tm). 
const authrequired = require('../auth/auth-required-middleware.js');

//----------------------------------------------------------------------------//
// This method is protected by adding the "authrequired" middleware function to
// the chain before the actual handler function that finds and returns all the
// users from the users model (DB). 
//----------------------------------------------------------------------------//
router.get('/', authrequired, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

//----------------------------------------------------------------------------//
// This is the middleware function that Gary provided during class. It's
// identical to the one I have ended up using in this project. I commented this
// one out, so you can see again how to use middleware in a separate module. See
// above where we are bringing the "auth" middleware in with a require()
// statement. Doing it like this allows us to use this middleware in every
// router (including the auth-router, and any others we may need to create.)
//----------------------------------------------------------------------------//
// function auth(req, res, next) {
//   const { username, password } = req.headers;
//   console.log(username);
//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         console.log("Success!")
//         next();
//       } else {
//         res.status(401).json({ message: 'Invalid Credentials' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// }

module.exports = router;


