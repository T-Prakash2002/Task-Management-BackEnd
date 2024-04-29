
const express = require('express');
const { connectDb, mongoose } = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDb();

const {handleMentorRegistration,handleStudentRegistration,handleLogin}=require("./service")

app.get('/',(req,res)=>{
    res.send("Server connected...")
})

app.post('/mentorRegistration',(req,res)=>{
    handleMentorRegistration(req, res);
})
app.post('/studentRegistration',(req,res)=>{
    handleStudentRegistration(req,res);
})


app.get("/login/:username/:password/:role", (apiReq, apiRes) => {
  handleLogin(apiReq, apiRes);
});

app.listen(4000,()=>{
    console.log("Server Started");
})
