const mongoose = require("mongoose");
const githubUserSchema = new mongoose.Schema({
    fullname: String,
    url: String,
    pic: String,
    githubId: String,
});

module.exports = mongoose.model("githubUsers", githubUserSchema);