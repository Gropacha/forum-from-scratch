const Joi = require("joi");
const { Schema, Types, model } = require("mongoose");

const ADMIN = "ADMIN";
const USER = "USER";
const roles = [ADMIN, USER];

const userSchema = new Schema({
    email : {type:String, required:true},
    password : {type:String, required:true},
    pseudo : String,
    role : {type:String, enum:roles, default:USER},
    likes : {type:[{type:Types.ObjectId, ref:"articles"}]}
});

const userJoi = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required()
});

const pseudoJoi = Joi.object ({
    pseudo : Joi.string().min(5).max(25).required()
})

let User = model("users", userSchema);
User.isValid = (user) => userJoi.validate(user);
User.pseudoIsValid = (pseudo) => pseudoJoi.validate(pseudo);

module.exports = User;