const UserModel = require('../models/userModel');
module.exports = {
    getUser,
    getAllUsers
}
async function getUser (req, res){
    try {
        let user = await UserModel.User.findOne({ _id: res.locals.authData.userId });
        let stdUser = user.standardizeUser();
        res.json(stdUser);
    }
    catch (err) {
        
        res.send({ error: `Unable to fetch your account details: ${err.message}` })
    }
}
async function getAllUsers (req, res){
    try {
        let users = await UserModel.User.find({ });
        let stdUsers = [];
        for (const user of users) {
            stdUsers.push(user.standardizeUser());
        }
        res.json(stdUsers);
    }
    catch (err) {
        res.send({ error: `Unable to fetch user list: ${err.message}` })
    }
}