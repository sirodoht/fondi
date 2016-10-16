/**
 * Fondi
 * An open courses platform.
 *
 * @author Theodore Keloglou
 * @file Main application boot file.
 */

var path = require('path');

var express = require('express');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config');

var routes = require('./routes/index');
var helpers = require('./util/helpers');
var listeners = require('./util/listeners');
var models = require('./models/index');
var authMidd = require('./middleware/auth.midd');

var app = express();

app.set('views', path.join(__dirname, '../front/views'));
app.set('view engine', 'pug');

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.use(favicon(path.join(__dirname, '../front/static', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
  secret: config.webserver.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: models.sequelize,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, function (username, password, done) {
  models.User.findOne({
    where: {
      username: username,
    },
  }).then(function (user) {
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.',
      });
    }
    return user.validPassword(password)
      .then(function (isMatch) {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
      });
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  models.User.findOne({
    where: {
      username: username,
    },
  }).then(function (user) {
    done(null, user);
  });
});

app.use(express.static(path.join(__dirname, '../front/static')));

app.use(authMidd.check);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

var port = config.webserver.port;
if (process.env.PORT) {
  port = process.env.PORT;
}
app.set('port', port);

// models.sequelize.sync({ force: true })
models.sequelize.sync()
  .then(function () {
    app.listen(port);
    app.on('error', listeners.onError);
    app.on('listening', listeners.onListening);
    console.log('Server running on http://localhost:' + port + '/');
  });

module.exports = app;
