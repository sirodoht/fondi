var models = require('../models');

var coursesCtrl = module.exports = {};

coursesCtrl.list = function (req, res) {
  models.Course.findAll()
    .then(function (allCourses) {
      res.send(allCourses);
    });
};

coursesCtrl.getCreate = function (req, res) {
  res.render('courses/create');
};

coursesCtrl.create = function (req, res) {
  var courseDetails = {
    name: req.body.name,
    description: req.body.desc,
  };
  models.Course.create(courseDetails)
    .then(function (course) {
      models.User.findOne({id: req.user.id})
        .then(function (user) {
          user.addCourse(course);
          res.redirect('/courses');
        });
    });
};

coursesCtrl.getEdit = function (req, res) {
  models.Course.findOne({id: req.params.id})
    .then(function (course) {
      res.render('courses/edit', {
        id: course.id,
        name: course.name,
        desc: course.description,
      });
    });
};

coursesCtrl.edit = function (req, res) {
  console.log('req.body', req.body);
  // models.
  res.redirect('/courses');
};
