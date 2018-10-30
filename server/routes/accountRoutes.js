const router = require('express').Router();
const security = require('../util/security');
const UserModel = require('../models/userModel');
const accountController = require('../controllers/accountController');

router.get('/my-account', security.authorize(), accountController.getUser);

router.get('/users', accountController.getAllUsers);


router.post('/change-password', security.authorize(), (req, res) => {
    res.send('Change your password');
});

//User will provide their email address to request password recovery
router.post('/password-recovery-request', (req, res) => {
    res.send('Enter your account email address');
});

//The user will provide their new password with confirmation, to this route
router.post('/password-recovery-process/:token', (req, res) => {
    res.send('Create a new account password');
});

//This route contains feedback info on the password recovery process
router.get('/password-recovery-complete', (req, res) => {
    res.send('Your account password has been updated');
});


module.exports = {
    router
};