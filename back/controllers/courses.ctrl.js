var models = require('../models');

var coursesCtrl = module.exports = {};

coursesCtrl.list = function (req, res) {
  models.Course.findAll()
    .then(function (allCourses) {
      res.send(allCourses);
    });
};

coursesCtrl.sections = function (req, res) {
  models.Section.findAll({
    where: {
      CourseId: req.params.sectionId,
    },
    raw: true,
  })
    .then(function (sections) {
      var username = 'sirodoht';
      if (req.user) {
        username = req.user.username;
      }
      res.json({
        username: username,
        courseId: req.params.courseId,
        sections: sections,
        currentSection: req.params.sectionId,
      });
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
            username: req.params.username,
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
      id: req.user.id,
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
  models.Section.findAll({
    where: {
      CourseId: req.params.courseId,
    },
    raw: true,
  })
    .then(function (sections) {
      res.render('courses/section', {
        username: req.params.username,
        courseId: req.params.courseId,
        sections: sections,
        currentSection: req.params.sectionId,
      });
    });
};

coursesCtrl.getNewSection = function (req, res) {
  res.render('courses/new-section', {
    username: req.user.username,
    courseId: req.params.courseId,
  });
};

coursesCtrl.edit = function (req, res) {
  models.Section.create(req.body)
    .then(function (section) {
      models.Course.findOne({where: {id: req.params.courseId}})
        .then(function (course) {
          course.addSection(section);
          res.redirect('/' + req.user.username + '/' + req.params.courseId);
        });
    });
};

coursesCtrl.sectionNew = function (req, res) {
  const username = req.user.username;
  const sectionData = {
    title: req.body.title,
    content: req.body.content,
  }

  models.Section.create(sectionData)
    .then(function (section) {
      models.Course.findOne({where: {id: req.params.courseId}})
        .then(function (course) {
          course.addSection(section);
          res.redirect('/' + username + '/' + req.params.courseId);
        });
    });
};
