var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');  // :TODO:
var flash = require('connect-flash');                 // :TODO:
var session = require('express-session');
var config = require('./config/database');
var passport = require ('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var percorsoRouter = require('./routes/percorsi');
var listRouter = require('./routes/list');
var mappaRouter = require('./routes/mappa');

var app = express();

// connessione a mongodb
mongoose.connect(config.database);
let db = mongoose.connection;
//controllo connessione al db
db.once ('open', function(){
    console.log('connected to mongodb successfully')
})
//controllo errori db
db.on('error', function(err){
    console.log(err);
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport config
require('./config/passport')(passport);
app.use(session({ secret: 'biciclesecret' }));
app.use(passport.initialize());
app.use(passport.session());

//gestione sessione
app.get('*', function(req,res,next){
  console.log(req.user)
  res.locals.user = req.user || null;
  next();
});

// routes
app.use('/', indexRouter);
app.use('/percorso', percorsoRouter);
app.use('/list', listRouter);
app.use('/mappa', mappaRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
