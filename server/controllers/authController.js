
const UserModel = require('../models/userModel');
const security = require('../util/security');
const bcrypt = require('bcryptjs');
//const uuidv1 = require('uuid/v1'); //to be used for unique ID's
const uuidv4 = require('uuid/v4'); //to be used for secure tokens
const email = require('../util/email');

module.exports = {
    register,
    confirmAccount,
    resendConfirmationToken,
    login,
    logout
}
async function sendEmail(emailAdd, token){
    let url = encodeURI(`http://localhost:4200/account-confirmation/?email=${emailAdd}&token=${token}`);
    let reply = await email.sendGmail(emailAdd, 'Account Confirmation',
            '<html>' +
            '<body>' +
            '<h2><ins>Please Confirm Your Account</ins></h2>'+
            '<br/>'+
            '<p>Click on the link below to confirm your account</p>' +
            `<a href=${url}>Confirm Your Account</a>`+
            '<p>If the link is unclickable, copy the following URL and paste it in a browser: </p>' +
            `<p>${url}</p>`+
            '<p>This email is computer generated. Please do not reply</p>' +
            '</body>' +
            '</html>', null);
    console.log(reply);
}

async function register(req, res, next) {
    let fullName = req.body.fullName,
        email = req.body.email,
        password = req.body.password
    try {
        var user = await UserModel.User.findOne({"local.email": email});
        if(user){
            return security.sendAuthError(res, 401, 'EmailTaken', 'Oops, this email is already in use')
        }
        var user = new UserModel.User({
            acctType: 'local',
            local: {
                fullname: fullName,
                email: email,
                pwdHash: await bcrypt.hash(password, 10)
            }
        });
        await user.save();
        var confirmToken = new UserModel.ConfirmToken({
            userId: user.id,
            token: uuidv4()
        });
        await confirmToken.save();
        await sendEmail(email, confirmToken.token);
        return res.send({
            successful: true,
            'account-conf-token': confirmToken.token,
            user
        });
    }
    catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}
async function resendConfirmationToken(req, res, next) {
    let email = req.body.email;
    try {
        var confirmToken = await UserModel.ConfirmToken.findOne({"local.email": email});
        if(!confirmToken){
            confirmToken = new UserModel.ConfirmToken({
                userId,
                token: uuidv4()
            });
            await confirmToken.save();
        }
        await sendEmail(email, confirmToken.token);
            return res.send({
                successful: true,
                message: `a new confirmation email has been sent to ${email}`
            })
    }
    catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}
async function confirmAccount(req, res, next) {
    let token = req.body.token,
        email = req.body.email;
    try {
        let confirmToken = await UserModel.ConfirmToken.findOne({token});
        if(!confirmToken){
            return security.sendAuthError(res, 401, 'TokenExpired',
            'invalid or expired token. Please request another confirmation email');
        }
        let query = {_id: confirmToken.userId, "local.email": email}
        let isUserAcctUpdated = await UserModel.User.findOneAndUpdate(query, 
            {$set:{"local.emailVerified": true}}, {new: true})
        if(!isUserAcctUpdated){
            return security.sendAuthError(res, 401, 'AccountNotFound',
            'failed to verify email. user account could not be found')
        }
        await UserModel.ConfirmToken.findByIdAndRemove(confirmToken.id);
        
        res.send({
            successful: true,
            message: `Email Address ${email} has been confirmed`
        })
    }
    catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}

async function login(req, res, next) {
    let email = req.body.email,
        password = req.body.password
    try{
        let user = await UserModel.User.findOne({ "local.email": email });
    if(!user){
        return security.sendAuthError(res, 401, 'IncorrectEmail',
        'Oops, You entered an incorrect email!');
    }
    
    let passwordMatched = await user.comparePassword(password);
    if(!passwordMatched){
        return security.sendAuthError(res, 401, 'IncorrectPassword',
        'Uh oh, you provided an incorrect password!')
    }
    // if (!user.local.emailVerified) {
    //     return res.status(200).json({ 
    //         successful: false,
    //         message: 'your account has not been verified!'
    //     })
    // }
    let stdUser = user.standardizeUser();
    let token = await security.createJWT(stdUser)
    security.sendTokenResponse(stdUser, token, res)
    }
    catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}

async function logout(req, res, next) {
    try {
        let expireDate = new Date(res.locals.authData.expireTime * 1000);
        let revokedAccessToken = new UserModel.RevokedAccessToken({
            token: res.locals.authData.token,
            removeAt: expireDate
        });
        await revokedAccessToken.save();
        res.send({ 
            successful: true,
            message: 'you have successfully logged out' 
        });
    }
    catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}

