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

coursesCtrl.getCourse = function (req, res) {
  console.log('req.user', req.user);
  models.Course.findOne({where: {id: req.params.courseId}})
    .then(function (course) {
      course.getCourseSections({raw: true})
        .then(function (sections) {
          res.render('courses/single', {
            username: req.user.username,
            courseId: course.id,
            name: course.name,
            desc: course.description,
            sections: sections,
          });
        });
    });
};

coursesCtrl.getSection = function (req, res) {
  models.CourseSection.findOne({
    where: {
      id: req.params.sectionId,
    },
    raw: true,
  })
    .then(function (section) {
      res.render('courses/section', {
        title: section.title,
        content: section.content,
      });
    });
};

coursesCtrl.edit = function (req, res) {
  models.CourseSection.create(req.body)
    .then(function (courseSection) {
      models.Course.findOne({where: {id: req.params.courseId}})
        .then(function (course) {
          course.addCourseSection(courseSection);
          res.redirect(req.get('referer'));
        });
    });
};
