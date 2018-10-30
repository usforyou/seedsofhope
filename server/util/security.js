
'use strict';

const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const config = require('../config');
const passport = require('passport');
//const Extract = require('passport-jwt')

module.exports = {
    createJWT,
    sendTokenResponse,
    sendAuthError,
    authorize
}
function createJWT(user) {
    let token = jwt.sign(
        { email: user.email, userId: user.userId, claims: user.claims },
        config.jwtSecret,
        {
            expiresIn: '12h', //12 hours
            algorithm: 'HS256'
        })
    return token;
}
function sendTokenResponse(user, token, res){
    return res.json({
        successful: true,
        userId: user.userId,
        name: user.fullname,
        token: token
    });
}
function sendAuthError(res, statusCode, errTitle, errMessage){
    res.status(statusCode).json({
        successful: false,
        title: errTitle,
        message: errMessage
    });
}

function authorize(authorizedRoles) {
    return async function (req, res, next) {
        let token = req.headers['authorization']
        if (!token) {
            return sendAuthError(res, 401, 'NotAuthorized', 'Not Authorized! Please login to continue')
        }
        let revokedToken = await UserModel.RevokedAccessToken.findOne({token});
        if(revokedToken){
            return sendAuthError(res, 401, 'NotAuthorized', 'Not Authorized! Please login to continue')
        }
        else {
            try {
                let payload = await jwt.verify(token, config.jwtSecret);
                let authData = {
                    token,
                    expireTime: payload.exp,
                    userId: payload.userId
                }
                res.locals.authData = authData;
                if (!authorizedRoles) {
                    return next();
                }
                else {
                    if (matchOne(authorizedRoles, payload.claims)) {
                        return next();
                    }
                    else {
                        return sendAuthError(res, 401, 'NotInRole', 'Not authorized role')
                    }
                }
            }
            catch (err) {
                switch (err.name) {
                    case 'TokenExpiredError':
                        return sendAuthError(res, 401, 'TokenExpired', 'Your login session has expired. Please login again!')
                    case 'JsonWebTokenError':
                        return sendAuthError(res, 401, 'TokenError', 'An error occured while verifying your token')
                    default:
                        err.status = 401;
                        return next(err);
                    //return res.status(401).json({ message: 'You are not authorized!' });
                }
            }
        }
    }
}

function matchOne(arr1, arr2) {
    return arr2.some(v => arr1.includes(v));
};