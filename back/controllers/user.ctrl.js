var gravatar = require('gravatar');

module.exports = userCtrl = {};

userCtrl.default = function(req, res, next) {
  var user = req.params.user;

  var userEmail = user + '@gmail.com';
  var gravatarImgUrl = gravatar.url(userEmail, {s: '100', r: 'x', d: 'retro'}, false);

  res.render('user', {
    user: user,
    userImg: gravatarImgUrl,
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
    res.redirect('/' + req.username);
  });

  // now instantiate an object
  // var task = Task.build({title: 'very important task'})
};
