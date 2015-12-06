// var gravatar = require('gravatar');
// var passport = require('passport');

var models = require('../models');

var coursesCtrl = module.exports = {};

coursesCtrl.list = function(req, res) {
  models.Course.findAll()
    .then(function(allCourses) {
      // console.log('allCourses', allCourses);
      // res.render('user-courses');
      res.send(allCourses);
    });
};

coursesCtrl.getCreate = function(req, res) {
  res.render('course-create');
};

coursesCtrl.create = function(req, res) {
  var user = req.user;

  models.Course.create(req.body)
    .then(function (course) {
      user.addCourse(course);
      res.redirect('/courses');
    });

};
