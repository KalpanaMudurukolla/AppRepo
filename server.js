//server.js
//importv express
const exp=require("express")
const app=exp();



//import dotenv module
require("dotenv").config()
//import path module
const path=require("path")
//merge this server with dist folder
app.use(exp.static(path.join(__dirname,'dist/cdb035')))
app.use(exp.json())
//import mongodb module
const mc=require("mongodb").MongoClient;
//databaseurl
const dburl=process.env.DBURL;
//connect to mongo cloud
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("err inn db connect",err)
    }
    else
    {
        //get database object
        const databaseobject=client.db("cdb035sample");
        //get collection object
        const userCollectionObj=databaseobject.collection("usercollection");
        //share it to apis
        app.set("usercollectionobj",userCollectionObj)
        console.log("connected to DB")
    }
})
//import api objects
const userApiObj=require("./APIS/user-api")
//forwarding req objects to Api routes
app.use("/user",userApiObj)
//middleware to deal with invalid paths
app.use((req,res,next)=>{
    res.send({message:req.url+"is invalid path"})

})
//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})
//assign port number
const port 
app.listen(,()=>{
    console.log("server on  port 3000")
})
//export mini express appn
