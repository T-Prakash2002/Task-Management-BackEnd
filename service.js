const { UserRegisterModel,
    MemberRegisterModel ,TaskModel} = require('./Schema')


const handleUserRegistration = async (apiReq, apiRes) => {


    const { username, password, email, age, phonenumber, dataofjoin, address, city, zipCode, role } = apiReq.body;

    if (
        username?.length &&
        password?.length &&
        email?.length &&
        age?.length &&
        phonenumber?.length &&
        address?.length &&
        city?.length &&
        zipCode?.length &&
        role?.length
    ) {
        const dbResponse = await UserRegisterModel.create({
            username: username,
            password: password,
            email: email,
            age: age,
            role: role,
            Phonenumber: phonenumber,
            Date_of_Join: dataofjoin,
            Address: address,
            City: city,
            ZipCode: zipCode
        })
        if (dbResponse?._id) {
            apiRes.send(dbResponse);
            return;
        }
    }

}

// const handleMemberRegistration = async (apiReq, apiRes) => {
// 
//     const { username, password, email, age, phonenumber, dataofjoin, address, city, zipCode, role } = apiReq.body;
// 
//     if (
//         username?.length &&
//         password?.length &&
//         email?.length &&
//         age?.length &&
//         phonenumber?.length &&
//         address?.length &&
//         city?.length &&
//         zipCode?.length &&
//         role?.length
// 
//     ) {
//         const dbResponse = await MemberRegisterModel.create({
//             username: username,
//             password: password,
//             email: email,
//             age: age,
//             Phonenumber: phonenumber,
//             Date_of_Join: dataofjoin,
//             Address: address,
//             City: city,
//             ZipCode: zipCode,
//             role: role
//         })
//         if (dbResponse?._id) {
//             apiRes.send(dbResponse);
//             return;
//         }
//     }
// }


const handleLogin = async (apiReq, apiRes) => {

    const { username, password, role } = apiReq.params;

    const dbResponse = await UserRegisterModel.findOne({
        username: username,
        password: password,
        role:role,
    }, { password: 0 });


    if (dbResponse?._id) {
        apiRes.send(dbResponse);
        return;
    }
    apiRes.send("Login Failed");
}

const handleGetMemberList = async (apiReq, apiRes) => {

    const dbResponse = await UserRegisterModel.find({role:'Member'}, { _id: 0, password: 0, __v: 0 })
    apiRes.send(dbResponse);
    return;

}

const handleCreateTask = async (apiReq, apiRes) => {


    const {
        Task_Name,
        description,
        assigned_member,
        TaskDeadLineDate,
        priority,
        assigner,
    } = apiReq.body;


    if (Task_Name?.length &&
        description?.length &&
        assigned_member?.length &&
        TaskDeadLineDate?.length &&
        priority?.length &&
        assigner?.length
    ) {
        
        const dbResponse=await TaskModel.create({
            Task_Name:Task_Name,
            Description:description,
            Assigner_Name:assigner,
            Priority:priority,
            TaskDueDate:TaskDeadLineDate,
            Assigned_members:assigned_member
        })

        if(dbResponse._id){
            apiRes.send(dbResponse);
            return;
        }else{
            console.log("fail")
        }

    }

}

const handleGetTaskList=async(apiRe,apiRes)=>{

    const dbResponse = await TaskModel.find()
    apiRes.send(dbResponse);
    return;

}


module.exports = {
    handleUserRegistration,
    // handleMemberRegistration,
    handleLogin,
    handleGetMemberList,
    handleCreateTask,
    handleGetTaskList,
}