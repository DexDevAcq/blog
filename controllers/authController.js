const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const {userModel} = require('../models/User_')


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


    async createNewUser(req, res) {
       try {
        const userData = req.body;
        const {login, email, password} = userData;

            if(login && email && password) {

                const hashedPassword = await bcrypt.hash(password, 10)
                const uniqueID = new mongoose.Types.ObjectId()

                const User = new userModel({
                    _id: uniqueID,
                    login,
                    email: email.toLowerCase(),
                    password: hashedPassword
                })

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    req.session.message = {
                        msg: JSON.stringify(errors.array()[0].msg)
                    }
                    return res.redirect('/auth/register')
                }
                const newUser = await User.save();

                if(newUser){
                    res.redirect('/auth/login')
                } else {
                    res.redirect('/auth/register')
                }
            }
        } catch (error) {
           console.log(error)
       }
    }

    LogOut(req, res) {
        req.logOut();
        res.redirect('/login');
    }
}


module.exports = new authController();