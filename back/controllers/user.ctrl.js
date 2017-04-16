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

/**
 * Render user edit view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
userCtrl.edit = function (req, res) {
  models.User.findOne({ where: { id: req.user.id } })
    .then(function (user) {
      res.render('user-edit', {
        username: user.username,
        email: user.email,
        name: user.name,
        bio: user.bio,
      });
    });
};

/**
 * Update user.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
userCtrl.update = function (req, res) {
  var updateData = {};
  if (req.body.username) {
    updateData.username = req.body.username;
  }
  if (req.body.email) {
    updateData.email = req.body.email;
  }
  if (req.body.name) {
    updateData.name = req.body.name;
  }
  if (req.body.bio) {
    updateData.bio = req.body.bio;
  }
  if (req.body.password && req.body.password === req.body.passwordConfirmation) {
    updateData.password = req.body.password;
  }
  models.User.findOne({username: req.user.username})
    .then(function (user) {
      return user.update(updateData);
    })
    .then(function () {
      res.end();
    });
};
