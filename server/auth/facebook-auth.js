const facebookStrategy = require('passport-facebook').Strategy
const UserModel = require("../models/googleUser.js");

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
        new facebookStrategy(
            {
                clientID: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                callbackURL: "http://localhost:5000/auth/facebook/callback",
                enableProof: true
            },
            function (accessToken, refreshToken, profile, cb) {
                console.log(profile);
                UserModel.findOne({ Id: profile.id }, async function (err, user) {
                    if (user) {
                        const updatedUser = {
                            fullname: profile.displayName,
                            email: profile.emails[0].value,
                            pic: profile.photos[0].value,
                            secret: accessToken,
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
                            Id: profile.id,
                            username: profile.displayName,
                            email: profile.emails[0].value,
                            pic: profile.photos[0].value,
                            secret: accessToken,
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