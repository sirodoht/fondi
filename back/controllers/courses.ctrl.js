const models = require('../models');

const coursesCtrl = module.exports = {};

coursesCtrl.getCreate = function (req, res) {
  res.render('courses/create');
};

coursesCtrl.create = function (req, res) {
  let newCourse = null;

  const courseDetails = {
    name: req.body.name,
    description: req.body.desc,
  };
  models.Course.create(courseDetails)
    .then(function (resCourse) {
      newCourse = resCourse;
      return models.User.findOne({ where: { id: req.user.id } });
    })
    .then(function (user) {
      user.addCourse(newCourse);
      res.redirect('/' + req.user.username + '/' + newCourse.slug);
    });
};

coursesCtrl.getCourse = function (req, res) {
  let course = null;

  models.Course.findOne({ where: { slug: req.params.courseSlug } })
    .then(function (resCourse) {
      course = resCourse;
      return resCourse.getSections({ raw: true });
    })
    .then(function (sections) {
      res.render('courses/single', {
        username: req.params.username,
        name: course.name,
        courseSlug: course.slug,
        description: course.description,
        sections: sections,
      });
    });
};

coursesCtrl.getOwnCourses = function (req, res) {
  let user = null;

  return models.User.findOne({ where: { id: req.user.id } })
    .then(function (resUser) {
      user = resUser;
      return user.getCourses({raw: true});
    })
    .then(function (courses) {
      res.render('user-courses', {
        username: user.username,
        bio: user.bio,
        courses: courses,
      });
    });
};

coursesCtrl.getSection = function (req, res) {
  let currentSection = null;

  return models.Section.findOne({ where: { slug: req.params.sectionSlug } })
    .then(function (resSection) {
      currentSection = resSection;
      return models.Section.findAll({
        where: {
          CourseId: currentSection.CourseId,
        },
        raw: true,
      });
    })
    .then(function (sections) {
      res.render('courses/section', {
        username: req.params.username,
        courseSlug: req.params.courseSlug,
        sections: sections,
        currentSection,
      });
    });
};

coursesCtrl.getNewSection = function (req, res) {
  res.render('courses/new-section', {
    username: req.user.username,
    courseSlug: req.params.courseSlug,
  });
};

coursesCtrl.sectionNew = function (req, res) {
  const username = req.user.username;
  const sectionData = {
    title: req.body.title,
    content: req.body.content,
  };

  let section = null;

  return models.Section.create(sectionData)
    .then(function (resSection) {
      section = resSection;
      return models.Course.findOne({ where: { slug: req.params.courseSlug } });
    })
    .then(function (course) {
      course.addSection(section);
      res.redirect('/' + username + '/' + req.params.courseSlug);
    });
};
