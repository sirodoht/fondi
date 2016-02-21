var models = require('../models');

var coursesCtrl = module.exports = {};

coursesCtrl.list = function (req, res) {
  models.Course.findAll()
    .then(function (allCourses) {
      res.send(allCourses);
    });
};

coursesCtrl.getCreate = function (req, res) {
  res.render('courses/course-create');
};

coursesCtrl.create = function (req, res) {
  models.Course.create(req.body)
    .then(function (course) {
      console.log('course', course);
      res.redirect('/courses');
    });
};
