const express = require("express");
const Router = express.Router();
const passport = require("passport");
//Google Route
Router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
Router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req);
        res.redirect(
            `http://localhost:3000/success?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}`
        );
    }
);

//facebook route

Router.get("/auth/facebook", passport.authenticate("facebook"));

Router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: "http://localhost:3000/login",
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req);
        res.redirect(
            `http://localhost:3000?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}`
        );
    }
);

//github route

Router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["profile", "email"] })
);
Router.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        failureRedirect: "http://localhost:3000/login",
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req);
        res.redirect(
            `http://localhost:3000/githubSuccess?fullname=${req.user.fullname}`
        );
    }
);

Router.get("/auth/twitter", passport.authenticate("twitter"));

Router.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
        failureRedirect: "http://localhost:3000/login",
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req);
        res.redirect(
            `http://localhost:3000?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}`
        );
    }
);



module.exports = Router;