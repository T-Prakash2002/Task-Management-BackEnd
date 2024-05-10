const mongoose = require("mongoose");
const process=require('dotenv').config()

const mongoUri =process.parsed.MongoDb;
  
const connectDb = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(mongoUri);
  console.log(mongoose.connection.readyState, " --- Connection State");
};


module.exports = {
  connectDb,
  mongoose,
};

