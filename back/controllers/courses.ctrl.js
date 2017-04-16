/**
 * @file Courses views controller.
 */

const models = require('../models');

const coursesCtrl = module.exports = {};

/**
 * Render course create view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
coursesCtrl.getCreate = function (req, res) {
  res.render('courses/create');
};

/**
 * Create new course with the logged in user as owner.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
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

/**
 * Render single course view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
coursesCtrl.getCourse = function (req, res) {
  if (req.user) {
    let course = null;
    let user = null;

    models.Course.findOne({ where: { slug: req.params.courseSlug } })
    .then(function (resCourse) {
      course = resCourse;
      return models.User.findOne({ where: { id: req.user.id } });
    })
    .then(function (resUser) {
      user = resUser;
      return course.getSections({ raw: true });
    })
    .then(function (sections) {
      res.render('courses/single', {
        username: user.username,
        bio: user.bio,
        name: course.name,
        courseSlug: course.slug,
        description: course.description,
        sections,
      });
    });
  } else {
    let course = null;
    let user = null;

    models.User.findOne({ where: { username: req.params.username } })
      .then(function (resUser) {
        user = resUser;
        return models.Course.findOne({ where: { slug: req.params.courseSlug } });
      })
      .then(function (resCourse) {
        course = resCourse;
        return course.getSections({ raw: true });
      })
      .then(function (sections) {
        res.render('courses/single', {
          username: user.username,
          bio: user.bio,
          name: course.name,
          courseSlug: course.slug,
          description: course.description,
          sections,
        });
      });
  }
};

/**
 * Render user courses view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
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

/**
 * Render single section view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
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

/**
 * Render new section view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
coursesCtrl.getNewSection = function (req, res) {
  res.render('courses/section-new', {
    username: req.user.username,
    courseSlug: req.params.courseSlug,
  });
};

/**
 * Render new section view.
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
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
      res.end('/' + username + '/' + req.params.courseSlug);
    });
};
