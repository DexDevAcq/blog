const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = Schema({
    login: {type: String},
    email: {type: String},
    password: {type: String},
});


module.exports = mongoose.model('User', User, 'users');