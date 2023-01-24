const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
const googleAuth = require("./routes/index");
const facebookAuth = require("./routes/index");
const githubAuth = require("./routes/index");
const twitterAuth = require("./routes/index");
const { Connect } = require("./config/connect");
const cors = require("cors");
const passport = require("passport");
const app = express();
//cors
app.use(cors());
//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
//dotenv
dotenv.config();
Connect();
//morgan
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./auth/google-auth")(passport);
require("./auth/facebook-auth")(passport);
require("./auth/github-auth")(passport);
require("./auth/twitter-auth")(passport);

app.use("/", googleAuth);
app.use("/", facebookAuth);
app.use("/", githubAuth);
app.use("/", twitterAuth);


app.use(express.static(path.join(__dirname, "public")));

module.exports = app;