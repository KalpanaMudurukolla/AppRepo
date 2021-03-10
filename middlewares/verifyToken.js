const jwt = require("jsonwebtoken")

const validateToken=(req,res,next)=>{
    //extractb token from header of req object
    let tokenWithBearer=req.headers['authorization']
    if(tokenWithBearer==undefined){
        res.send({message:"failed",reason:"unauthorized access....please login to continue"})
    }
    else{
        //get token from bearer token
        let token=tokenWithBearer.slice(7,tokenWithBearer.length)
        //verify token
    jwt.verify(token,"abcdef",(err,decodedToken)=>{
        if(err){
        res.send({message:"failed",reason:"session expired.....please relogin to continue"})
        }
        else{
next();
        }
    })
    }

}
module.exports=validateToken;