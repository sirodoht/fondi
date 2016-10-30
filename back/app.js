/**
 * Fondi
 * Open courses platform.
 *
 * @author Theodore Keloglou
 * @file Main application boot file.
 */

const path = require('path');

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('config');

const routes = require('./routes/index');
const models = require('./models/index');
const authMidd = require('./middleware/auth.midd');

const app = express();

app.set('views', path.join(__dirname, '../front/views'));
app.set('view engine', 'pug');

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

if (process.env.NDOE_ENV !== 'production') {
  app.use(logger('dev'));
}

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
  const err = new Error('Not Found');
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

app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

let port = config.webserver.port;
if (process.env.PORT) {
  port = process.env.PORT;
}
app.set('port', port);

// models.sequelize.sync({ force: true })
models.sequelize.sync()
  .then(function () {
    app.listen(port);
    app.on('error', function (error) {
      console.error('App error:', error);
      process.exit(1);
    });
    console.log('Server running on port:', port);
  });

module.exports = app;
