const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { uservalidation } = require('../zod/Validation');
const { postvalidation } = require('../zod/Validation');
signup,signin
const signup = async(req,res)=>{
    const {email,password} = uservalidation.safeParse(req.body);
    if(!email||!password){
        return res.status(400).send('Invalid input');
    }
}