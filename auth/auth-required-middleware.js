const users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

//----------------------------------------------------------------------------//
// Here we create a middleware method that can be added to any handler to ensure
// that credentials are included in the API call as headers ("username" and
// "password"). Remember that headers are encrypted over HTTPS calls, so sending
// the credentials in headers is safe. Do *not* ever send usernames and
// passwords in query parameters... the URL, including the query parameter, is
// NOT encrypted, and very often is stored in log files. You don't want your
// user's credentials showing up in log files across the Internet! (Every router
// that touches the HTTP request packet before it reaches the server running
// NodeJS and your code will likely be logging the request and the URL to a log
// file somewhere, and some random admin, while spot-checking log files, will
// see those credentials... and the user will be compromised.)
// 
// Note that requiring username and password in headers for every single API
// call is not standard practice... there are better ways to do it, but we
// haven't learned them yet. This exercise is mainly to learn how to use
// middleware to protect specific API endpoints. 
//----------------------------------------------------------------------------//
module.exports = (req, res, next) => {
    // look for the credentials
    const { username, password } = req.headers
    // validate that they exist ... we didn't have this part in class...
    if (!(username && password)) {
        res.status(401).json({ message: "invalid credentials" });
    } else {
        // find the user in the DB
        users.findBy({ username })
            // limit the resulting array to the first element, so we have an
            // element and not an array to work with...
            .first()
            .then(_user => {
                // validate that the user exists in the DB ("_user" wouldn't be
                // defined if the user isn't found), and compare the password
                // from the header with the password hash in the DB.
                // bcrypt.compareSync() will take care of this for us. Remember
                // that in order to genrate the same hash for the password,
                // bcrypt must have the salt that was used originally (it
                // doesn't use a random salt this time... only when we initially
                // hash the password), and it must have the same cost factor
                // that was used before. These two values are stored along with
                // the hash in the database... bcrypt provides them as part of
                // the hash string.
                if (_user && bcrypt.compareSync(password, _user.password)) {
                    // if the user exists in the DB, and the password checks
                    // out, call the next middleware method.
                    next()
                } else {
                    // in either case (bad username, or bad password), tell them
                    // "no". But don't tell them why! Mildly inconvenient for
                    // sincere users, but debilitating for would-be-hackers.
                    res.status(401).json({ messege: "Invalid Credentials" })
                }
            })
            // if there is a DB problem... or other problem on our end...
            .catch((err) => { res.status(500).json({ messege: err }) })
    }
}