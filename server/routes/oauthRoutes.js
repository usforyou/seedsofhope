const router = require('express').Router(),
      mongoose = require('mongoose'),
      security = require('../util/security'),
      passport = require('passport'),
      authController = require('../controllers/authController'),
      socialController = require('../controllers/socialController');

router.get('/roles', (req, res) => {
    res.json(['employee', 'employer', 'admin']);
})

router.post('/register', authController.register);

router.post('/confirm-account', authController.confirmAccount)

router.post('/resend-confimation', authController.resendConfirmationToken)

router.post('/login', authController.login);

router.post('/google', socialController.googleAuth);
router.post('/linkedIn', socialController.linkedInAuth);
router.post('/facebook', socialController.facebookAuth);


// router.post('/facebook',
//     passport.authenticate('facebook', { session: false }), socialController.socialLogin);

router.post('/twitter',
    passport.authenticate('twitter', { session: false }), socialController.socialLogin);



router.get('/logout', security.authorize(), authController.logout);

module.exports = {
    router
}



