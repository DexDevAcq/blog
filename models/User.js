const bcrypt = require('bcrypt');
const fs = require('fs');
const DB_LINK_USERS = `${__dirname}/../DB/users.json`
const userModel = require('./User_');
const mongoose = require('mongoose');

class UserModel {

    constructor(link){
        this.usersLink = link;
    }

    async getAllData() {
       const users = await userModel.find({})
       return users
    }


    async findById(id){
        // const data  = this.getAllData();
        const user = await userModel.findById(id)
        if(user){
            return user
        } else {
            console.log('There is no such user')
        }
    }


    async findUserByEmail(email) {
        // const data  = this.getAllData();
            const user = await userModel.findOne({email})

            if(user){
                return user
            } else {
                console.log('There is no such user')
            }

    }

    async createNewOne(userData){
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
    

            const newUser = await User.save();

            return newUser
        }

    }

    
}


module.exports = new UserModel(DB_LINK_USERS);

