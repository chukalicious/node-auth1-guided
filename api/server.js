const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//import session
const session = require("express-session");

const usersRouter = require("./users/users-router.js");
const authRouter = require("./auth/auth-router");

const server = express();

//creating session
const sessionConfig = {
  name: "monkey",
  secret: "keep it secret, keep it safe",
  cookie: {
    maxAge: 60 * 60 * 1000, //for an hour
    secure: false, //true, for https certificate
    httpOnly: true,
  },
  resave: false, //for data store stuff
  saveUninitialized: false, //that law thing
};

server.use(helmet());
server.use(express.json());
server.use(cors());

//using session
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
