const {body} = require('express-validator');

module.exports = {
    loginValidation: [

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
    
    ], 
    registerValidation: [
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
    
    ]
}