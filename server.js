// dependencies
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
const methodOverride = require('method-override')

const app = express()

// sessions
app.set('trust proxy', 1)
app.use(session({
    secret: 'app',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true
    },
}))


// serve static content
app.use(express.static(process.cwd() + '/public'))

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

app.use(favicon(__dirname + '/public/assets/img/favicon.ico'))
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))


const app_controller = require('./controllers/ramen_controller')
const users_controller = require('./controllers/users_controller')
app.use('/', app_controller)
app.use('/users', users_controller)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

// module gets exported as app.
module.exports = app

// Where's listen? Check bin/www and read the comments.
