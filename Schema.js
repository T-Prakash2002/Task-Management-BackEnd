const {mongoose} =require('./db')

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  age:{type:Number},
  Phonenumber:{type:Number},
  Date_of_Join:{type:Date},
  Address:{type:String},
  City:{type:String},
  ZipCode:{type:Number},
  role:{type:String}
});
const TaskSchema = new Schema({
  Task_Name: { type: String },
  Description: { type: String },
  Assigned_members: { type: Array },
  taskId:{type:Number},
  phonenumber:{type:Number},
  TaskDueDate:{type:Date},
  Priority:{type:String},
  taskStatus:{type:String},
  Assigner_Name:{type:String}
});


const UserRegisterModel=mongoose.model("Users",RegistrationSchema); 

const TaskModel=mongoose.model("Tasks",TaskSchema);

module.exports={
    UserRegisterModel,
    TaskModel
}
