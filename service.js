const { MentorRegisterModel,
    StudentRegisterModel } = require('./Schema')


const handleMentorRegistration = async (apiReq, apiRes) => {
    

    const { username, password, email, age } = apiReq.body;

    if (
        username?.length &&
        password?.length &&
        email?.length &&
        age?.length
    ) {
        const dbResponse = await MentorRegisterModel.create({
            username: username,
            password: password,
            email: email,
            age: age
        })
        if (dbResponse?._id) {
            apiRes.send(dbResponse);
            return;
        }
    }

}

const handleStudentRegistration = async (apiReq, apiRes) => {

    const { username, password, email, age } = apiReq.body;

    if (
        username?.length &&
        password?.length &&
        email?.length &&
        age?.length
    ) {
        const dbResponse = await StudentRegisterModel.create({
            username: username,
            password: password,
            email: email,
            age: age
        })
        if (dbResponse?._id) {
            apiRes.send(dbResponse);
            return;
        }
    }
}


const handleLogin = async (apiReq, apiRes) => {
    
    const { username, password,role } = apiReq.params;

    const Model=(role==='mentor')?MentorRegisterModel:StudentRegisterModel;

    const dbResponse = await Model.findOne({
        username: username,
        password: password,
        
    });

    if (dbResponse?._id) {
        apiRes.send(dbResponse.username);
        return;
    }
    apiRes.send("Login Failed");
}
module.exports = {
    handleMentorRegistration,
    handleStudentRegistration,
    handleLogin
}