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
