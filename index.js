
const express = require('express');
const { connectDb, mongoose } = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDb();

const {handleAdminRegistration,handleMemberRegistration,handleLogin}=require("./service")

app.get('/',(req,res)=>{
    res.send("Server connected...")
})

app.post('/adminRegistration',(req,res)=>{
    handleAdminRegistration(req, res);
})
app.post('/memberRegistration',(req,res)=>{
    handleMemberRegistration(req,res);
})


app.get("/login/:username/:password/:role", (apiReq, apiRes) => {
  handleLogin(apiReq, apiRes);
});

app.listen(4000,()=>{
    console.log("Server Started");
})
