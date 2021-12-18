
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const passport = require('passport');
const flash = require('express-flash-messages');
const session = require('express-session');
const paginateHelper = require('./express-handlebars-paginate');


const initializePassport = require('./passport-config.js');
initializePassport(passport)



const app = express();

const mainRouter = require('./router');

const PORT  = 5000;
const SESS_SECRET = 'secret'; 


app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('paginateHelper', paginateHelper.createPagination);
hbs.registerHelper('shortDescription', function(text) {
    return text.substring(0, 20) + '...'
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
        
        app.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }   
}


startApp(app);