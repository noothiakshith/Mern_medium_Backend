const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { uservalidation } = require('../zod/Validation');

const signup = async(req,res)=>{
    const {email,password} = uservalidation.safeParse(req.body);
    if(!email||!password){
        return res.status(400).send('Invalid input');
    }
    try{
        const checking = await User.findOne({email:email});
        if(checking){
            return res.status(400).send('User already exists');
        }
        else{
            newtokengeneration();
            const user = new User({
                email:email,
                password:password
            })
            await user.save();
            res.status(200).send('User created');
        }
    }
    catch(err){
        return res.status(400).send('Error');
    }
}

const signin = async(req,res)=>{
    const{email,password} = await uservalidation.safeParse(req.body);
    if(!email||!password){
        return res.status(400).send('Invalid input');
    }
    try{
        const checking = await User.finOne({emaai:email});
        if(!checking){
            return res.status(400).send('User does not exist');
        }
        else{
            if(checking.password!==password){
                return res.status(400).send('Invalid password');
            }
            else{
                newtokengeneration();
                res.status(200).send('User logged in');
            }
        }
    }
    catch(err){
        return res.status(400).send('Error');
    }
}

const newtokengeneration = async()=>{
    const token = jwt.sign({_id:User._id},process.env.TOKEN_SECRET);
    return token;
}

module.exports={signin,signup,newtokengeneration}