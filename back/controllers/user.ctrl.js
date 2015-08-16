var gravatar = require('gravatar');

var models = require('../models');

module.exports = userCtrl = {};

userCtrl.default = function (req, res, next) {
  var userParam = req.params.user;

  console.log('user::', userParam);

  models.User.findOne({
    where: {
      username: userParam,
    }
  }).then(function (user) {
    var userEmail = userParam + '@gmail.com';
    if (user !== null) {
      userEmail = user.dataValues.email;
    }
    console.log('user.email::', user);
    var gravatarImgUrl = gravatar.url(userEmail, {s: '100', r: 'x', d: 'retro'}, false);

    res.render('user', {
      email: userEmail,
      img: gravatarImgUrl,
      name: user.name,
      username: user.username,
    });
  });

  // next();
};

userCtrl.getRegister = function (req, res, next) {
  res.render('register');
};

userCtrl.register = function (req, res, next) {
  console.log(req.body);
  models.User.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(function() {
    res.redirect('/' + req.body.username);
  });
};

userCtrl.getLogin = function (req, res, next) {
  res.render('login');
};

};
