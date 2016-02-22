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
      models.User.findOne({where: {id: req.user.id}})
        .then(function (user) {
          user.addCourse(course);
          res.redirect('/courses/' + course.id + '/edit');
        });
    });
};

coursesCtrl.getEdit = function (req, res) {
  models.Course.findOne({where: {id: req.params.courseId}})
    .then(function (course) {
      course.getCourseSections({raw: true})
        .then(function (courseSections) {
          res.render('courses/edit', {
            id: course.id,
            name: course.name,
            desc: course.description,
            courseSections: courseSections,
          });
        });
    });
};

coursesCtrl.edit = function (req, res) {
  models.CourseSection.create(req.body)
    .then(function (courseSection) {
      models.Course.findOne({where: {id: req.params.courseId}})
        .then(function (course) {
          course.addCourseSection(courseSection);
        });
    });
  res.redirect('/courses');
};
