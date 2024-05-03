const { AdminRegisterModel,
    MemberRegisterModel } = require('./Schema')


const handleAdminRegistration = async (apiReq, apiRes) => {


    const { username, password, email, age, phonenumber , dataofjoin , address, city , zipCode } = apiReq.body;

    if (
        username?.length &&
        password?.length &&
        email?.length &&
        age?.length &&
        phonenumber?.length &&
        address?.length &&
        city?.length &&
        zipCode?.length
    ) {
        const dbResponse = await AdminRegisterModel.create({
            username: username,
            password: password,
            email: email,
            age: age,
            Phonenumber: phonenumber,
            Date_of_Join:dataofjoin,
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

const handleMemberRegistration = async (apiReq, apiRes) => {

    const { username, password, email, age, phonenumber , dataofjoin , address, city , zipCode } = apiReq.body;

    if (
        username?.length &&
        password?.length &&
        email?.length &&
        age?.length &&
        phonenumber?.length &&
        address?.length &&
        city?.length &&
        zipCode?.length

    ) {
        const dbResponse = await MemberRegisterModel.create({
            username: username,
            password: password,
            email: email,
            age: age,
            Phonenumber: phonenumber,
            Date_of_Join:dataofjoin,
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


const handleLogin = async (apiReq, apiRes) => {

    const { username, password, role } = apiReq.params;

    const Model = (role === 'Admin') ? AdminRegisterModel : MemberRegisterModel;

    const dbResponse = await Model.findOne({
        username: username,
        password: password,

    }, { password: 0 });


    if (dbResponse?._id) {
        apiRes.send(dbResponse);
        return;
    }
    apiRes.send("Login Failed");
}
module.exports = {
    handleAdminRegistration,
    handleMemberRegistration,
    handleLogin
}