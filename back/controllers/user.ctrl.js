/**
 * @file User views controller.
 */

const models = require('../models');

const userCtrl = module.exports = {};

/**
 * Render user register view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
userCtrl.getRegister = function (req, res) {
  res.render('register');
};

/**
 * Register new user.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
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

/**
 * Render login view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
userCtrl.getLogin = function (req, res) {
  res.render('login');
};

/**
 * Render logout view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
userCtrl.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};
