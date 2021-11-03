const express = require("express");
const mongoose = require("mongoose");

//creating schema
const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    UserName:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    Password:{
        type:String,
        required:true,
        unique:true,
    },
})

//creating new collection
const UsersDetails = new mongoose.model("UserDetails", userSchema);

// exporting UsersDetails so we can use it anywhere
module.exports = UsersDetails;