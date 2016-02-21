var gravatar = require('gravatar');
var passport = require('passport');

var models = require('../models');

module.exports = userCtrl = {};

userCtrl.default = function(req, res, next) {
  var userParam = req.params.user;

  // retrieve user from db model
  models.User.findOne({
    where: {
      username: userParam,
    }
  }).then(function(user) {
    // populate variables to sent to user view

    var userEmail = '';
    if (user !== null) {
      userEmail = user.dataValues.email;
    }

    var gravatarImgUrl = gravatar.url(userEmail, {s: '260', r: 'x', d: 'retro'}, false);

    // var fullName = user.getFullname();

    res.render('user', {
      email: userEmail,
      img: gravatarImgUrl,
      name: user.name,
      username: user.username,
    });
  });

  // next();
};

userCtrl.getRegister = function(req, res, next) {
  res.render('register');
};

userCtrl.register = function(req, res, next) {
  models.User.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(function() {
    res.redirect('/' + req.body.username);
  });
};

userCtrl.getLogin = function(req, res, next) {
  res.render('login');
};
