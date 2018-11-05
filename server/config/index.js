'use strict';

module.exports = {
    jwtSecret: require('crypto').randomBytes(300),
    mongo: {
        url: 'mongodb://localhost:27017/seedsofhope',
        username: '',
        password: ''
    },
    facebook: {
        appID : '',
        appSecret : '',
        callbackUrl : ''
    },
    google: {
        appID : '',
        appSecret : '',
        callbackUrl : ''
    },
    linkedIn: {
        appID : '',
        appSecret : '',
        callbackUrl : ''
    },
    twitter: {
        apiKey : '',
        apiSecret : '',
        callbackUrl : ''
    }
}