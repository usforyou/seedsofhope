const UserModel = require('../models/userModel');
const security = require('../util/security');
const passport = require('passport');
const GoogleStrategy = require('passport-google-plus-token');
const FacebookStrategy = require('passport-facebook-token');
const TwitterStrategy = require('passport-twitter-token');
const config = require('../config');
const axios = require('axios');



module.exports = {
    socialLogin,
    googleAuth,
    linkedInAuth,
    facebookAuth
}
async function socialLogin(req, res, next) {
    let token = await security.createJWT(req.user)
    return res.json({
        successful: true,
        user: req.user,
        token
    });
}
async function googleAuth(req, res, next) {
    id = req.body.id;
    email = req.body.email;
    name = req.body.name;
    photo = req.body.photoUrl;
    try {
        //see if user exists in the DB
        let user = await UserModel.User.findOne({
            "google.googleId": id
        });

        //create new Google Profile in DB if user does not exist
        if (!user) {
            user = new UserModel.User({
                acctType: 'google',
                google: {
                    googleId: id,
                    email: email,
                    fullname: name,
                    profilePhoto: photo
                }
            })
            await user.save();
        }
        stdUser = user.standardizeUser();
        let token = await security.createJWT(stdUser)
        security.sendTokenResponse(stdUser, token, res)
    } catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}
async function linkedInAuth(req, res, next) {
    id = req.body.id;
    email = req.body.email;
    name = req.body.name;
    photo = req.body.photoUrl;
    try {
        //see if user exists in the DB
        let user = await UserModel.User.findOne({
            "linkedIn.linkedInId": id
        });

        //create new Google Profile in DB if user does not exist
        if (!user) {
            user = new UserModel.User({
                acctType: 'linkedIn',
                linkedIn: {
                    linkedInId: id,
                    email: email,
                    fullname: name,
                    profilePhoto: photo
                }
            })
            await user.save();
        }
        stdUser = user.standardizeUser();
        let token = await security.createJWT(stdUser)
        security.sendTokenResponse(stdUser, token, res)
    } catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}

async function facebookAuth(req, res, next) {
    id = req.body.id;
    email = req.body.email;
    name = req.body.name;
    photo = req.body.photoUrl;
    try {
        //see if user exists in the DB
        let user = await UserModel.User.findOne({
            "facebook.facebookId": id
        });

        //create new Facebook Profile in DB if user does not exist
        if (!user) {
            user = new UserModel.User({
                acctType: 'facebook',
                facebook: {
                    facebookId: id,
                    email: email,
                    fullname: name,
                    profilePhoto: photo
                }
            })
            await user.save();
        }
        stdUser = user.standardizeUser();
        let token = await security.createJWT(stdUser)
        security.sendTokenResponse(stdUser, token, res)
    } catch (err) {
        security.sendAuthError(res, 500, 'ServerError', err.message);
    }
}
// passport.use('googlePlus', new GoogleStrategy({
//     clientID: config.google.appID,
//     clientSecret: config.google.appSecret
// }, async (accessToken, refreshToken, profile, done) => {

//     try {
//         //see if user exists in the DB
//         let user = await UserModel.User.findOne({
//             "google.googleId": profile.id
//         });

//         //create new Google Profile in DB if user does not exist
//         if (!user) {
//             user = new UserModel.User({
//                 acctType: 'google',
//                 google: {
//                     googleId: profile.id,
//                     email: profile.emails[0].value,
//                     fullname: profile.displayName,
//                     profilePhoto: profile.photos[0].value
//                 }
//             })
//             await user.save();
//         }
//         done(null, user.StandardizeUser());
//     } catch (err) {
//         done(err);
//     }
// }));

// passport.use('facebook', new FacebookStrategy({
//     clientID: config.facebook.appID,
//     clientSecret: config.facebook.appSecret
// }, async (accessToken, refreshToken, profile, done) => {

//     try {
//         //see if user exists in the DB
//         let user = await UserModel.User.findOne({
//             "facebook.facebookId": profile.id
//         });

//         //create new Facebook Profile in DB if user does not exist
//         if (!user) {
//             user = new UserModel.User({
//                 acctType: 'facebook',
//                 facebook: {
//                     facebookId: profile.id,
//                     email: profile.emails[0].value,
//                     fullname: profile.displayName,
//                     profilePhoto: profile.photos[0].value
//                 }
//             })
//             await user.save();
//         }
//         done(null, user.StandardizeUser());
//     } catch (err) {
//         done(err);
//     }
// }));

// passport.use('twitter', new TwitterStrategy({
//     consumerKey: config.twitter.appID,
//     consumerSecret: config.twitter.appSecret
// }, async (accessToken, refreshToken, profile, done) => {

//     console.log('access token: ', accessToken);
//     console.log('refresh token: ', refreshToken);
//     console.log('profile: ', profile);
//     try {
//         //see if user exists in the DB
//         let user = await UserModel.User.findOne({ "twitter.twitterId": profile.id });

//         //create new Facebook Profile in DB if user does not exist
//         if (!user) {
//             user = new UserModel.User({
//                 acctType: 'twitter',
//                 twitter: {
//                     twitterId: profile.id,
//                     email: profile.emails[0].value,
//                     fullname: profile.displayName,
//                     profilePhoto: profile.photos[0].value
//                 }
//             })
//             await user.save();
//         }
//         done(null, user.StandardizeUser());
//     }
//     catch (err) {
//         done(err);
//     }
// }));
