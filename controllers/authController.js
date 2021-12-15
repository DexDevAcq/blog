const userModel = require('../models/User');
const passport = require('passport');
const {validationResult} = require('express-validator');




class authController{
    getRegisterPage(req, res) {
        res.render('register');
    }


    handleLoginMsg(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            return res.redirect('/auth/login')
        }

        next()
    }


    getLoginPage(req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     // return res.status(400).json({ errors: errors.array() });
        //     return res.render('login', {
        //         error: JSON.stringify(errors.array()[0].msg)
        //     });
        // } 
        const flashMessages = res.locals.getMessages();
        if(flashMessages.error){
            res.render('login', {
                showError: true,
                errors: flashMessages.error
            })
        } else {
            res.render('login')
        }
    }


    createNewUser(req, res) {
        const userData = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            return res.redirect('/auth/register')
        }
        const user = userModel.createNewOne(userData);

        if(user){
            res.redirect('/auth/login')
        } else {
            res.redirect('/auth/register')
        }
    }

    LogOut(req, res) {
        req.logOut();
        res.redirect('/login');
    }
}


module.exports = new authController();