'user strict';

const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    acctType: {type: String, required: true, enum: ['local', 'google', 'facebook', 'twitter', 'linkedIn']},
    local: {
        fullname: {type: String},
        email: { type: String, lowercase: true},
        emailVerified: { type: Boolean },
        pwdHash: { type: String },
        profilePhoto: { type: String}
    },
    facebook: {
        facebookId:{type: String},
        email: {type: String},
        fullname: {type: String},
        profilePhoto: {type: String}
    },
    google: {
        googleId:{type: String},
        email: {type: String},
        fullname: {type: String},
        profilePhoto: {type: String}
    },
    linkedIn: {
        linkedInId:{type: String},
        email: {type: String},
        fullname: {type: String},
        profilePhoto: {type: String}
    },
    twitter: {
        twitterId:{type: String},
        email: {type: String},
        fullname: {type: String},
        profilePhoto: {type: String}
    },
    phone: {type: String},
    phoneVerified: { type: Boolean },
    claims: {type: [String], default: ['tutor', 'student']},
    created: {type: Date, default: Date.now, required: false}
});

const confirmTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200} 
});
const recoverTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200} 
});
const revokedAccessTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    removeAt: { type: Date, required: true, expires: 0}  
})

userSchema.methods.comparePassword = async function(password){
    let isMatch = await bcrypt.compare(password, this.local.pwdHash);
    return isMatch;
}
userSchema.methods.standardizeUser = function() {
    let standardizedUser ={
        userId: this._id,
        acctType: this.acctType,
        phone: this.phone,
        phoneVerified: this.phoneVerified,
        claims: this.claims,
        created: this.created,
    };
    switch(this.acctType){
        case "local": 
            standardizedUser.fullname = this.local.fullname,
            standardizedUser.email = this.local.email,
            standardizedUser.emailVerified = this.local.emailVerified,
            standardizedUser.profilePhoto = this.local.profilePhoto
            break;
        case "google": 
            standardizedUser.fullname = this.google.fullname,
            standardizedUser.email = this.google.email,
            standardizedUser.emailVerified = true,
            standardizedUser.profilePhoto = this.google.profilePhoto
            break;
        case "facebook": 
            standardizedUser.fullname = this.facebook.fullname,
            standardizedUser.email = this.facebook.email,
            standardizedUser.emailVerified = true,
            standardizedUser.profilePhoto = this.facebook.profilePhoto
            break;
        case "twitter": 
            standardizedUser.fullname = this.twitter.fullname,
            standardizedUser.email = this.twitter.email,
            standardizedUser.emailVerified = true,
            standardizedUser.profilePhoto = this.twitter.profilePhoto
            break;
        case "linkedIn": 
            standardizedUser.fullname = this.linkedIn.fullname,
            standardizedUser.email = this.linkedIn.email,
            standardizedUser.emailVerified = true,
            standardizedUser.profilePhoto = this.linkedIn.profilePhoto
            break;
    }
    return standardizedUser;
}
userSchema.set('toJSON', {
    transform: function (doc, record, options) {
        //record.userId = record._id;
        //delete record._id;
        delete record.__v;
        if(record.acctType === 'local'){
            delete record.local.pwdHash; 
        }
    }
})

//listen for index events and handle errors
// revokedAccessTokenSchema.on('index', (err)=>{
//     if(err){
//         console.error(`Index Error: ${err.message}`);
//     }
// })

module.exports = {
    User: mongoose.model('User', userSchema),
    ConfirmToken: mongoose.model('ConfirmToken', confirmTokenSchema),
    RecoverToken: mongoose.model('RecoverToken', recoverTokenSchema),
    RevokedAccessToken: mongoose.model('RevokedAccessToken', revokedAccessTokenSchema)
}

