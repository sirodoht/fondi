var gravatar = require('gravatar');
var passport = require('passport');

var models = require('../models');

module.exports = coursesCtrl = {};

coursesCtrl.list = function(req, res, next) {
  models.Course.findAll()
    .then(function(allCourses) {
      console.log('allCourses', allCourses);
      // res.render('user-courses');
      res.send(allCourses);
    });
};

coursesCtrl.getCreate = function(req, res, next) {
  res.render('course-create');
};

coursesCtrl.create = function(req, res, next) {
  models.Course.create(req.body)
    .then(function() {
      res.redirect('/');
    });

};
