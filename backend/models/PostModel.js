const mongoose = require('mongoose');

const postmodel = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:3,
        maxlength:1000
    },
    content:{
        type:String,
        reqiured:true,
        trim:true
    },
    Published:{
        type:Boolean,
        default:false
    },
})
const post = new mongoose.model('Post',postmodel);
module.exports= post;