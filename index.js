
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const passport = require('passport');
const flash = require('express-flash-messages');
const session = require('express-session');
const paginateHelper = require('./express-handlebars-paginate');
const mongoose = require('mongoose');


const initializePassport = require('./passport-config.js');
initializePassport(passport)



const app = express();

const mainRouter = require('./router');

const PORT  = 5000;
const SESS_SECRET = 'secret'; 
const DB_URL = 'mongodb://localhost:27017/blog'


app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('paginateHelper', paginateHelper.createPagination);
hbs.registerHelper('shortDescription', function(text) {
    return text.substring(0, 20) + '...'
})
hbs.registerHelper('currentDate', function(time){
    const date = new Date(time)
    let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
    let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let month = monthsList[date.getMonth()];
    let day = daysList[date.getDay()];

    return `${date.getDate()} ${month}, ${day}`
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: SESS_SECRET,   
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null
    }
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', mainRouter)

function startApp(app) {
    try {
        

        mongoose.connect(DB_URL, (err) => {
            console.log('connected ot db');
        })

        app.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }   
}


startApp(app);