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
          res.redirect('/courses/' + course.id);
        });
    });
};

coursesCtrl.getCourse = function (req, res) {
  models.Course.findOne({where: {id: req.params.courseId}})
    .then(function (course) {
      course.getSections({raw: true})
        .then(function (sections) {
          res.render('courses/single', {
            username: req.user.username,
            courseId: course.id,
            name: course.name,
            description: course.description,
            sections: sections,
          });
        });
    });
};

coursesCtrl.getEditCourse = function (req, res) {
  models.Course.findOne({where: {id: req.params.courseId}})
    .then(function (course) {
      course.getSections({raw: true})
        .then(function (sections) {
          res.render('courses/edit', {
            username: req.user.username,
            courseId: course.id,
            name: course.name,
            desc: course.description,
            sections: sections,
          });
        });
    });
};

coursesCtrl.getOwnCourses = function (req, res) {
  models.User.findOne({
    where: {
      // id: req.user.id,
      id: 1,
    },
  })
    .then(function (user) {
      user.getCourses({raw: true})
        .then(function (courses) {
          res.render('user-courses', {
            username: user.username,
            courses: courses,
          });
        })
    });
};

coursesCtrl.getSection = function (req, res) {
  models.Section.findOne({
    where: {
      id: req.params.sectionId,
    },
    raw: true,
  })
    .then(function (section) {
      res.render('courses/section', {
        name: section.name,
        content: section.content,
      });
    });
};

coursesCtrl.getNewSection = function (req, res) {
  res.render('courses/section', {
    title: '',
    content: '',
  });
};

coursesCtrl.edit = function (req, res) {
  console.log('req.params.courseId', req.params.courseId);
  models.Section.create(req.body)
    .then(function (section) {
      models.Course.findOne({where: {id: req.params.courseId}})
        .then(function (course) {
          course.addSection(section);
          // res.redirect(req.get('referer'));
          res.redirect('/' + req.user.username + '/' + req.params.courseId);
        });
    });
};
