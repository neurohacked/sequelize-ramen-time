// dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override'); // for deletes in express


// model controllers (rather than routes)
const app_controller = require('./controllers/app_controller');
const ramen_controller = require('./controllers/ramen_controller');
const users_controller = require('./controllers/users_controller');

// instantiate  app
const app = express();
// sessions
const sess = {
    secret: 'app',
    cookie: {
        maxAge: null
    },
    resave: true,
    saveUninitialized: true
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

// override POST to have DELETE and PUT
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'))

//set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/', app_controller);
app.use('/ramen', ramen_controller);
app.use('/users', users_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

// module gets exported as app.
module.exports = app;

// Where's the listen? Open up bin/www, and read the comments.
