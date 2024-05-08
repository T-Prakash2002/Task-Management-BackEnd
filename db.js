const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://prakasht1405:MongoDB145@cluster0.korygfe.mongodb.net/task-management";

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(mongoUri);
  console.log(mongoose.connection.readyState, " --- Connection State");
};



module.exports = {
  connectDb,
  mongoose,
};
