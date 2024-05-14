
const express = require('express');
const { connectDb, mongoose } = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const process=require('dotenv').config()
const jwt=require('jsonwebtoken')


// const token=jwt.sign({data:"mypassword"},process.parsed.SECRET_KEY);
// const decode=jwt.verify(token,process.parsed.SECRET_KEY)

// console.log(decode);

const app = express();
app.use(cors());
app.use(bodyParser.json());



const {handleUserRegistration,
handleLogin,
verifyUser,
handleLoginUser,
handleGetMemberList,
handleCreateTask,
handleGetTaskList,
handleGetParticularMemberTask,
handleDeleteTask,
handleUpdateTask,
handleUpdateStatusTask,
handleupdatePriority,
handleUpdatePermissionTask
}=require("./service");

const auth=(req,res,next)=>{

    if (req.path === "/login"){
    next();
  }
  else if(req.path==="/UserRegistration"){
    next();
  }
   else {

    const userToken = req.headers.auth;
    if (!userToken) {
      res.send(400);
    }
    
    const tokenDecoded = jwt.verify(userToken,process.parsed.SECRET_KEY);
    
    const id = tokenDecoded.data;


    verifyUser(id).then((response) => {
      if (response) {
        next();
      } else {
        res.send(400);
      }
    });
}
}
app.use(auth)

connectDb();

app.get('/',(req,res)=>{
    res.send("Server connected...")
})

app.post('/UserRegistration',(req,res)=>{
    handleUserRegistration(req, res);
})

app.get("/login", (apiReq, apiRes) => {
  handleLogin(apiReq, apiRes);
});

// app.get("/loginUser", (apiReq, apiRes) => {
//   handleLoginUser(apiReq, apiRes);
// });

app.get("/getMemberList",(apiReq,apiRes)=>{
    handleGetMemberList(apiReq,apiRes);
})

app.post("/createTask",(apiReq,apiRes)=>{

    handleCreateTask(apiReq,apiRes)
})

app.get("/getTaskList",(apiReq,apiRes)=>{
    handleGetTaskList(apiReq,apiRes);
})

app.get("/getTaskParticularMember/:username",(apiReq,apiRes)=>{
    handleGetParticularMemberTask(apiReq,apiRes)
})

app.put("/EditTask/:idNum",(apiReq,apiRes)=>{
    handleUpdateTask(apiReq,apiRes)
})
app.put("/updateStatus/:id",(apiReq,apiRes)=>{
    handleUpdateStatusTask(apiReq,apiRes)
})

app.put("/updatePermission/:email",(apiReq,apiRes)=>{
    handleUpdatePermissionTask(apiReq,apiRes)
})
app.put("/handleupdatePriority/:id",(apiReq,apiRes)=>{
    handleupdatePriority(apiReq,apiRes)
})

app.delete("/deleteParticularTask/:id",(apiReq,apiRes)=>{
    handleDeleteTask(apiReq,apiRes);
})



app.listen(4000,()=>{
    console.log("Server Started");
})
