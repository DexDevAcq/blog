const mongoose = require('mongoose');
const {Schema} = mongoose;


const User = new Schema({
    login: {type: String},
    email: {type: String},
    password: {type: String},
});


const model = mongoose.model('User', User, 'users');

module.exports = {
    userModel: model,
}