const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        minlength: [ 3, 'Username must be atleast 3 charecters long' ]
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        minlength: [ 10, 'email must be atleast 10 charecters long' ]
    },

    password:{
        type:String,
        required:true,
        trim: true,
        minlength: [ 5, 'password must be atleast 5 charecters long' ]
    },

    phone:{
        type:String,
        required:true,
        trim: true,
        minlength:10,
        maxlength:10
    },

    college:{
        type:String,
        required:true,
    },

    skills:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }

},{timestamps:true});

module.exports = mongoose.model("User",userSchema);

