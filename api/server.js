const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//import session
const session = require("express-session");

//import connect session to store session in the database
const knexSessionStore = require("connect-session-knex")(session);

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

  //create this for when storing session in the database
  //and configure it as below:
  store: new knexSessionStore({
    //pull in the database
    knex: require("../database/connection"),
    table: "sessions",
    sidfieldname: "sid",
    createtable: true,
    cleanIntervals: 60 * 60 * 1000,
  }),
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
