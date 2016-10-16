var auth = module.exports = {}

auth.authOnly = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.authed = true;
    next();
  } else {
    res.locals.authed = false;
    res.status = 401;
    res.render('error', {
      message: 'Not Authorised',
    });
  }
}

auth.check = function (req, res, next) {
  console.log('req.isAuthenticated():', req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.locals.authed = true;
  } else {
    res.locals.authed = false;
  }
  next();
}
