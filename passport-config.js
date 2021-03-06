const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('./models/User.js');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = userModel.findUserByEmail(email.toLowerCase());
        if (user == null){
            return done(null, false, {message: 'No user with that email'})
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: "password incorrect"})
            }
        } catch(e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, userModel.findById(id))
    })
}


module.exports = initialize