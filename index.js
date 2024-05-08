
const express = require('express');
const { connectDb, mongoose } = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDb();

const {handleUserRegistration,
handleLogin,
handleGetMemberList,
handleCreateTask,
handleGetTaskList,
handleGetParticularMemberTask,
handleDeleteTask,
handleUpdateTask,
handleUpdateStatusTask
}=require("./service")

app.get('/',(req,res)=>{
    res.send("Server connected...")
})

app.post('/UserRegistration',(req,res)=>{
    handleUserRegistration(req, res);
})


app.get("/login/:username/:password/:role", (apiReq, apiRes) => {
  handleLogin(apiReq, apiRes);
});


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

app.delete("/deleteParticularTask/:id",(apiReq,apiRes)=>{
    handleDeleteTask(apiReq,apiRes);
})



app.listen(4000,()=>{
    console.log("Server Started");
})
