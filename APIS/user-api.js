//user-api.js
//mini express app
const bcryptjs = require("bcryptjs");
const exp=require("express")
const userApiObj=exp.Router();
require("dotenv").config()
const errorHandler=require("express-async-handler");
const jwt= require("jsonwebtoken");
//import validate token middleware
const validateToken=require("./middlewares/verifyToken")
//define Routes
//http:/localhost:3000/getusers
userApiObj.get("/getusers",errorHandler(async (req,res)=>{
    //get user collection obj
    let userCollectionObj=req.app.get("usercollectionobj")
    //read users from user
    let usersArray=await userCollectionObj.find().toArray()
    res.send({message:usersArray})
}))
//http://localhost:3000/getuser/username
userApiObj.get("/getuser/:username",validateToken,errorHandler(async(req,res)=>{
    console.log(req.params)//req.params read the data from the db urel and returns object
    //get user collection obj
    let userCollectionObj=req.app.get("usercollectionobj")
    //read user by user name
    let usersArray=await userCollectionObj.findOne({username:req.params.username})
    res.send({message:usersArray})
}))
//http://localhost:3000/createuser
userApiObj.post("/createuser",async (req,res)=>{
    //get user collection obj from client
    let userObj=req.body;
    let userCollectionObj=req.app.get("usercollectionobj")
    //search for user in db with username of client obj
    let userObjFromDb=await userCollectionObj.findOne({username:userObj.username})
    //if user is already existed
    if(userObjFromDb!=null)
    {
        res.send({message:"user already existed"})
    }
    //if user is not existed
    else
    {
        //hash ur password
        await userCollectionObj.insertOne(userObj)
    }
    //insert userobj to usercollection
    userCollectionObj.insertOne(userObj)
.then(userObj=>{
    res.send({message:"user created successfully"})
})
.catch(err=>{
    console.log("err in reading user",err)
})
})




// //http://localhost:3000/upadteuser
// userApiObj.put("/updateuser",async (req,res)=>{
    
//     let userCollectionObj=req.app.get("usercollectionobj")
//     let newUserObj=req.body;
//     //update
//     userCollectionObj.updateOne({username:newUserObj.username},{$set:{
//         email:newUserObj.email,
//         city:newUserObj.city,
//         salry:newUserObj.salary,
//         age:newUserObj.age

//     }})
    


//http://localhost:3000/upadteuser
userApiObj.put("/updateuser",async (req,res)=>{
    
    let userCollectionObj=req.app.get("usercollectionobj")
    let newUserObj=req.body;
    //update
    userCollectionObj.updateOne({username:newUserObj.username},{$set:{
        email:newUserObj.email,
        city:newUserObj.city,
        salry:newUserObj.salary,
        age:newUserObj.age

    }})
    .then(success=>res.send({message:"product updated successfully"}))
    .catch(err=>{
        console.log("err in updating user")
    })
})
//http://localhost:3000/removeuser
userApiObj.delete("/removeuser",(req,res)=>{
    res.send({message:"user data is removed"})
})
module.exports=userApiObj;
//------------------------------------------------------------------------------------------
//user login route
userApiObj.post("/login",errorHandler(async(req,res)=>{
    let credObj=req.body;
    //verify user
    let userFromDb=await userCollectionObj.findOne({username:credObj.username})
    //if username not existed
    if(userFromDb==null)
    {
        res.send({message:"invalid username"})
    }
    //if user is existed, then compare passwords
    else{
        //compare city
let result =await bcryptjs.compare(credObj.email,userFromDb.email)
//if password not matched
if(result==false){
    res.send({message:"invalid email"})
}
//if pw is matched
else{
//create a json token and sign it
let signedToken=await jwt.sign({username:userFromDb.username},process.env.SECRET,{expiresIn:100})
//send signed token to client
res.send({message:"login success",token:signedToken,username:userFromDb.username})
}
    }
}))