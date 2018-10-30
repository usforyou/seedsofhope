const nodemailer = require('nodemailer');

const privateTransporter = nodemailer.createTransport({
    host: '',
    secure: false,
    port: 587,
    from: '"Us For You" <noreply@usforyou.com>',
    auth:{
        user: '',
        pass: ''
    },
    tls: {
        rejectUnauthorized: false
    }
});
const gmailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    from: '"Us For You" <usforyougroup@gmail.com>',
    auth:{
        user: 'usforyougroup@gmail.com',
        pass: 'Jingalala@123'
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function email(recipients, subject, htmlBody, attachments){
    const mailOptions = {
        attachments: attachments,
        to: recipients,
        subject: subject,
        html: htmlBody
    };
    try{
        var info = await privateTransporter.sendMail(mailOptions);
        return info.response;
    }
    catch(err){
        throw err;
    }
}

async function gMail(recipients, subject, htmlBody, attachments){
    const mailOptions = {
        attachments: attachments,
        to: recipients,
        subject: subject,
        html: htmlBody
    };
    try{
        var info = await gmailTransporter.sendMail(mailOptions);
        return info.response;
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    sendEmail: email,
    sendGmail: gMail
};