var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./back/routes/index');
var db = require('./back/models/index');
var models = require('./back/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'front/views'));
app.set('view engine', 'jade');

// app.use(favicon(path.join(__dirname, 'front/static', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    // session: false,
  }, function(username, password, done) {
    models.User.findOne({
      where: {
        username: username
      }
    }).then(function (user) {
      console.log('did this run 1');
      // if (err) {
      //   console.log('error 1', err);
      //   return done(err);
      // }
      if (!user) {
        console.log('error 2, username');
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        console.log('error 3, password');
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));
app.use(express.static(path.join(__dirname, 'front/static')));

app.use('/', routes);
// app.use('/:user', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
