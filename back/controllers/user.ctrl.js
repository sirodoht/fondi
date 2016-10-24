var models = require('../models');

var userCtrl = module.exports = {};

userCtrl.getRegister = function (req, res) {
  res.render('register');
};

userCtrl.register = function (req, res) {
  models.User.create({
    username: req.body.username,
    name: req.body.name,
    bio: req.body.bio,
    email: req.body.email,
    password: req.body.password,
  }).then(function () {
    res.redirect('/login');
  });
};

userCtrl.getLogin = function (req, res) {
  res.render('login');
};

userCtrl.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};
