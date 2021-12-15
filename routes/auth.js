const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');
const {body} = require('express-validator');
const checkIsNotAuth = require('./midleware/checkIsNotAuth');
const checkIsAuth = require('./midleware/checkIsAuth');

const router = express.Router();


router.get('/register', checkIsNotAuth, authController.getRegisterPage);

router.post('/register', checkIsNotAuth, [
    body('login')
    .notEmpty()
    .withMessage('Username cannot be empty'),

    body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Not valid email'),

    body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 6})
    .withMessage('The password has to be at least 6 letters')

], authController.createNewUser);

router.get('/login', checkIsNotAuth,  authController.getLoginPage);

router.post('/login', checkIsNotAuth, [

    body('email')
    .notEmpty()
    .withMessage('Cannot be empty')
    .isEmail()
    .withMessage('Not valid email'),

    body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 6})
    .withMessage('Wrong password')

], authController.handleLoginMsg, 

passport.authenticate('local', {
    successRedirect: '/articles',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.post('/logout', checkIsAuth,  authController.LogOut);



module.exports = router; 