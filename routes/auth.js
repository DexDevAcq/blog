const express = require('express');

const passport = require('passport');

const authController = require('../controllers/authController');

const checkIsNotAuth = require('./midleware/checkIsNotAuth');
const checkIsAuth = require('./midleware/checkIsAuth');
const {loginValidation, registerValidation} = require('./midleware/authValidation');

const router = express.Router();


router.get('/register', checkIsNotAuth, authController.getRegisterPage);

router.post('/register', checkIsNotAuth, registerValidation, authController.createNewUser);

router.get('/login', checkIsNotAuth,  authController.getLoginPage);

router.post('/login', checkIsNotAuth, loginValidation, authController.handleLoginMsg, passport.authenticate('local', {
    successRedirect: '/articles',
    failureRedirect: '/auth/login',
    failureFlash: true
}));



router.post('/logout', checkIsAuth,  authController.LogOut);



module.exports = router; 