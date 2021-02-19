const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const users = require("../users/users-model");

//registering user
router.post("/register", async (req, res) => {
  const user = req.body;
  //create hash using bcryptjs
  const hash = bcryptjs.hashSync(user.password, 10);
  //replace the user's password with the hash
  user.password = hash;

  try {
    const savedUser = await users.add(user);
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

///loging in
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //   console.log(username, password);

  try {
    const user = await users.findBy({ username }).first(); //forgetting this
    //limit is what's causing my bug because this function
    //returns an array. I need only one item in that array
    console.log(user);
    if (user && bcryptjs.compareSync(password, user.password)) {
      //
      //
      //on the req.session we're making a user property on the session to which
      //we are assigning the value of the user from the database.
      //what this does is it updates the session store with that object
      //so that when we are passing back and forth the session id
      //the session will have a user property on it which means
      //that we have successfully logged in before

      req.session.user = user;
      res.status(200).json({ message: `welcome ${user.username}` });
    } else {
      res.status(401).json({ message: "you shall not pass" });
    }
  } catch (err) {
    res.status(500).json({
      message: "we could not log you in at this time",
      error: err.message,
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send("could not log out");
      } else {
        res.send("you've left Middle Earth");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
