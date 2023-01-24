const mongoose = require("mongoose");
const twitterUserSchema = new mongoose.Schema({
    fullname: String,
    url: String,
    pic: String,
    twitterId: String,
});

module.exports = mongoose.model("twitterUsers", twitterUserSchema);