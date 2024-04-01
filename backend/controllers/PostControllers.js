const jwt = require('jsonwebtoken');
const postvalidation = require('../zod/Validation');
const Post = require('../models/Post');

const create = async(req,res)=>{
    generateid();
    try{
        const{title,content}=postvalidation.safeparse(req.body);
        if(!title||!content){
            return res.status(400).send('Invalid input');
        }
        const check = isloggedin();
        if(!check){
            return res.status(400).send('User not logged in');
        }
        const finding = await Post.findOne({title:title});
        if(finding){
            return res.status(400).send('Post already exists');
        }
        const post = new Post({
            title:title,
            content:content
        })
        Post.update({published:true});
        await post.save();
        res.status(200).send('Post created');
    }
    catch(err){
        return res.status(400).send('Error');
    }
}

const update = async(req,res)=>{
    const {id} = req.headers.id;
    if(!id){
        return res.status(400).send('Invalid input');
    }
    const check = isloggedin();
    if(!check){
        return res.status(400).send('User not logged in');
    }
    const finding = await Post.findOne({id:id});
    if(!finding){
        return res.status(400).send('Post not found');
    }
    try{
        const{title,content} = postvalidation.safeparse(req.body);
        if(!title||!content){
            return res.status(400).send('Invalid input');
        }
        const updation = await Post.findOneAndUpdate({
            title:title,
            content:content
        })
         await updation.save();
        res.status(200).send('Post updated');
    }
    catch(err){
        return res.status(400).send('Error');
    }
}

const read = async(req,res)=>{
    const{id}=req.headers.id;
    if(!id){
        return res.status(400).send('Invalid input');
    }
    const checking = isloggedin();
    if(!checking){
        return res.status(400).send('User not logged in');
    }
    const finding = await Post.findOne({id:id});
    if(!finding){
        return res.status(400).send('Post not found');
    }
    try{
        res.send(finding);
    }
    catch(err){
        return res.status(400).send('Error');
    }
}

const readall = async(req,res)=>{
    const checking = isloggedin();
    if(!checking){
        return res.status(400).send('User not logged in');
    }
    try{
        const finding = await Post.find();
        res.send(finding);
    }
    catch(err){
        return res.status(400).send('Error');
    }
}

const isloggedin = ()=>{
    const token = req.headers.token;
    if(!token){
        return false;
    }
    try{
        const verified = jwt.verify(token,process.env.Jwt_Secret);
        return true;
    }
    catch(err){
        return false;
    }
}

const generateid = ()=>{
    const id = Math.floor(Math.random()*100000);
    return id;
}

module.exports={create,update,read,readall,isloggedin,generateid}