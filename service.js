const { UserRegisterModel, TaskModel } = require('./Schema')
const jwt = require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const process=require('dotenv').config()


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
        const docCount = await UserRegisterModel.estimatedDocumentCount();

        const myHashPassword = await bcryptjs.hash(values.password, 4);

        const user = await User.findOne({ email });
        if (user) {
            return apiRes.send("email already registered");
        }

        const dbResponse = await UserRegisterModel.create({
            id: docCount + 1,
            username: username,
            password: myHashPassword,
            email: email,
            age: age,
            role: role,
            Phonenumber: phonenumber,
            Date_of_Join: dataofjoin,
            Address: address,
           
        })

        if (dbResponse?._id) {
            apiRes.send(dbResponse);
            return;
        } else {
            apiRes.send("Registration Failed")
            return
        }
    }

}

const handleLogin = async (apiReq, apiRes) => {

    const { email,password, role } = apiReq.query;



    const dbResponse = await UserRegisterModel.findOne({
        email: email,role:role
    });

    if(!dbResponse){
        return apiRes.send("Email not registered!")
        }

    const isValid = await bcryptjs.compare(
                password,
                dbResponse.password
              );

// console.log(isValid);
    if(isValid){

        const token = jwt.sign({ data: dbResponse._id }, process.parsed.SECRET_KEY);

        const res=await UserRegisterModel.findOne({email},{password:0})


        const dbResponse1 = { ...res, tokenValid: token }

        apiRes.send(dbResponse1);

        return;
    }
    else{
        apiRes.send("Login Failed");
    }
}

const verifyUser = async (username) => {
    const dbResponse = await UserRegisterModel.findOne({ username: username });
    if (dbResponse._id) {
        return true;
    }
    return false;
}
// const handleLoginUser = async (apiReq, apiRes) => {
// 
//     const { username, role, id } = apiReq.query;
// 
//     const dbResponse = await UserRegisterModel.findOne({
//         username: username,
//         role: role,
//         _id: id
//     }, { password: 0 });
// 
// 
//     if (dbResponse?._id) {
// 
// 
// 
//         const token = jwt.sign({ data: username }, "userkey");
// 
//         const dbResponse1 = { ...dbResponse, tokenValid: token }
// 
//         apiRes.send(dbResponse1);
// 
//         return;
//     }
//     apiRes.send("Login Failed");
// }

const handleGetMemberList = async (apiReq, apiRes) => {

    const dbResponse = await UserRegisterModel.find({ role: 'Member' }, { _id: 0, password: 0, __v: 0 })
    apiRes.send(dbResponse);
    return;

}

const handleCreateTask = async (apiReq, apiRes) => {


    const {
        Task_Name,
        description,
        assigned_member,
        CreatedAt,
        TaskDeadLineDate,
        TaskDeadLineTime,
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

        const dbResponse = await TaskModel.create({
            Task_Name: Task_Name,
            Description: description,
            Assigner_Name: assigner,
            Priority: priority,
            CreatedAt: CreatedAt,
            TaskDueDate: TaskDeadLineDate,
            TaskDueTime: TaskDeadLineTime,
            Assigned_members: assigned_member,
            taskStatus: 'Pending'
        })

        if (dbResponse._id) {
            apiRes.send(dbResponse);
            return;
        } else {
            console.log("fail")
        }

    }

}

const handleGetTaskList = async (apiReq, apiRes) => {

    const dbResponse = await TaskModel.find();
    apiRes.send(dbResponse);
    return;

}

const handleGetParticularMemberTask = async (apiReq, apiRes) => {
    const { username } = apiReq.params;

    const dbResponse = await TaskModel.find({ Assigned_members: username });

    apiRes.send(dbResponse);

    return;
}


const handleUpdateTask = async (apiReq, apiRes) => {
    const { idNum } = apiReq.params;
    const {
        Task_Name,
        description,
        assigned_member,
        TaskDeadLineDate,
        TaskDeadLineTime,
        priority,
        assigner,
    } = apiReq.body;

    const dbResponse = await TaskModel.findOneAndUpdate({ _id: idNum }, {
        $set: {
            Task_Name: Task_Name,
            Description: description,
            Assigner_Name: assigner,
            Priority: priority,
            TaskDueDate: TaskDeadLineDate,
            TaskDueDate: TaskDeadLineTime,
            Assigned_members: [...assigned_member]
        }
    })
    if (dbResponse?._id) {
        apiRes.send(dbResponse);
        return;
    }
    apiRes.send("Update Failed");
}

const handleDeleteTask = async (apiReq, apiRes) => {
    const { id } = apiReq.params;

    const dbResponse = await TaskModel.findOneAndDelete({ _id: id })

    if (dbResponse?._id) {
        apiRes.send(dbResponse);
        return;
    }
    apiRes.send("Deleted Failed");
}

const handleUpdateStatusTask = async (apiReq, apiRes) => {
    const { id } = apiReq.params;
    const {
        taskStatus,
        reminder
    } = apiReq.body;

    const dbResponse = await TaskModel.findOneAndUpdate({ _id: id }, {
        $set: {
            taskStatus: taskStatus,
            reminder: reminder
        }
    })
    if (dbResponse?._id) {
        apiRes.send(dbResponse);
        return;
    }
    apiRes.send("Update Failed");
}
const handleupdatePriority = async (apiReq, apiRes) => {
    const { id } = apiReq.params;
    const {
        Priority,
        reminder
    } = apiReq.body;
    const dbResponse = await TaskModel.findOneAndUpdate({ _id: id }, {
        $set: {
            Priority: Priority,
            reminder: reminder
        }
    })
    if (dbResponse?._id) {
        apiRes.send(dbResponse);
        return;
    }
    apiRes.send("Update Failed");
}


module.exports = {
    handleUserRegistration,
    handleLogin,
    handleGetMemberList,
    handleCreateTask,
    handleGetTaskList,
    handleGetParticularMemberTask,
    handleDeleteTask,
    handleUpdateTask,
    handleUpdateStatusTask,
    handleupdatePriority,
    verifyUser
}