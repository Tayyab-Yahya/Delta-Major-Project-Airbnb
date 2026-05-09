const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    // we don't need to define the schema for username and password because passportLocalMongoose will bydefault create and hash them.
});

// userSchema.plugin(passportLocalMongoose);

// This tells Mongoose: "Use the function, whether it's the main export or the default"
userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);