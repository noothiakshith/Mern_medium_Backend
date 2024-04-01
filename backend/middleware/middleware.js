const jwt = require('jsonwebtoken');

const jwtauth = async(req,res,next)=>{
    try{
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).send({message:'Unauthorized'});
        }
        const token = authorization.split(' ')[1];
        if(!token){
            return res.status(401).send({message:'Unauthorized'});
        }
        else{
            try{
                const verification = await jwt.verify(token,process.env.SECRET);
                if(!verification){
                    return res.status(401).send({message:'Unauthorized'});
                }
                req.user = verification;
                next();
            }
            catch(error){
                return res.status(401).send({message:'Unauthorized'});
            }
        }
    }
    catch(error){
        return res.status(401).send({message:'Unauthorized'});
    }
}