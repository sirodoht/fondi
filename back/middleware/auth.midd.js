/**
 * @file Authentication middleware.
 */

const auth = module.exports = {};

/**
 * Allow only authenticated users.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 * @param {Function} next Call next middleware.
 */
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
};

/**
 * Check if user is authenticated and populate respective view variable.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 * @param {Function} next Call next middleware.
 */
auth.check = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.authed = true;
  } else {
    res.locals.authed = false;
  }
  next();
};
