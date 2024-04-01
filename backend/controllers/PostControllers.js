const jwt = require('jsonwebtoken');
const postvalidation = require('../zod/Validation');
const Post = require('../models/Post');
create,update,read,readall
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
        await post.save();
        res.status(200).send('Post created');
    }
    catch(err){
        return res.status(400).send('Error');
    }
}
