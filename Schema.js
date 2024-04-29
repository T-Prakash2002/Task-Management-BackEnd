const {mongoose} =require('./db')

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  age:{type:Number},
});



const MentorRegisterModel=mongoose.model("mentors",RegistrationSchema);

const StudentRegisterModel=mongoose.model("students",RegistrationSchema);

module.exports={
    MentorRegisterModel,
    StudentRegisterModel
}