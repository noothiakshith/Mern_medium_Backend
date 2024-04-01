const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:1000
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1000
    },
    isloggedin:{
        type:Boolean,
        default:false
    }
})

const user = new mongoose.model('User',usermodel);
module.exports=user;