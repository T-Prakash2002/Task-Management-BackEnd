const { date } = require('yup');
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
  ZipCode:{type:Number}
});



const AdminRegisterModel=mongoose.model("Admins",RegistrationSchema);

const MemberRegisterModel=mongoose.model("Members",RegistrationSchema);

module.exports={
    AdminRegisterModel,
    MemberRegisterModel
}

// username: values.username,
//                 password: values.password,
//                 email: values.email,
//                 age: values.age,
//                 phonenumber: values.phonenumber,
//                 dataofjoin: values.dataofjoin,
//                 address: values.address,
//                 city: values.city,
//                 zipCode: values.zipCode,