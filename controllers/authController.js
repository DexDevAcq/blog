const userModel = require('../models/User');
const {validationResult} = require('express-validator');




class authController{
    getRegisterPage(req, res) {
        res.render('register', {showData: {
            showLoginBtn: true,
            showRegisterBtn: false
        }});
    }


    handleLoginMsg(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            return res.redirect('/auth/login')
        }

        next()
    }


    getLoginPage(req, res) {
        const flashMessages = res.locals.getMessages();
        if(flashMessages.error){
            res.render('login', {
                showError: true,
                errors: flashMessages.error,
                showData: {
                    showLoginBtn: false,
                    showRegisterBtn: true
                }
            })
        } else {
            res.render('login', {showData: {
                showLoginBtn: false,
                showRegisterBtn: true
            }})
        }
    }


    createNewUser(req, res) {
        const userData = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
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