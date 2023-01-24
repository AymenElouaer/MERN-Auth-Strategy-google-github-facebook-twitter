const GitHubStrategy = require('passport-github').Strategy;
const UserModel = require("../models/githubUser.js");

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        UserModel.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(
        new GitHubStrategy(
            {
                clientID: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                callbackURL: "http://localhost:5000/auth/github/callback",
            },
            function (accessToken, refreshToken, profile, cb) {
                console.log(profile);
                UserModel.findOne({ githubId: profile.id }, async function (err, user) {
                    if (user) {
                        const updatedUser = {
                            fullname: profile.displayName,
                            url: profile.profileUrl,
                            pic: profile.photos[0].value,
                        };
                        await UserModel.findOneAndUpdate(
                            { _id: user.id },
                            { $set: updatedUser },
                            { new: true }
                        ).then((result) => {
                            return cb(err, result);
                        });
                    } else {
                        const newUser = new UserModel({
                            githubId: profile.id,
                            username: profile.displayName,
                            url: profile.profileUrl,
                            pic: profile.photos[0].value
                        });
                        newUser.save().then((result) => {
                            return cb(err, result);
                        });
                    }
                });
            }
        )
    );
};