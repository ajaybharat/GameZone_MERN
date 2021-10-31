const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "",
    },
    sankeGameScore: {
        type: Number,
        default: 0,
    },
    Game2048Score: {
        type: Number,
        default: 0,
    }
},
{ timestamps: true }
);

const UserModel = mongoose.model("UserGameModel", UserSchema);

module.exports = UserModel;