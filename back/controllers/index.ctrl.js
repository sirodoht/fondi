/**
 * @file Index view controller.
 */

const models = require('../models');

const indexCtrl = module.exports = {};

/**
 * Get index view
 *
 * @param {Object} req The express request object.
 * @param {object} res The express response object.
 */
indexCtrl.getIndex = function (req, res) {
  let user = null;
  let userCourses = null;
  const allCourses = [];

  if (req.user) {
    models.User.findOne({ where: { id: req.user.id } })
      .then(function (resUser) {
        user = resUser;
        return resUser.getCourses({raw: true});
      })
      .then(function (resCourses) {
        userCourses = resCourses;
        return models.User.findAll({
          where: {
            id: {
              $ne: req.user.id,
            }
          }
        });
      })
      .map(function (resUser) {
        const curUsername = resUser.username;
        return resUser.getCourses()
          .then(function (courses) {
            courses.forEach(function (course) {
              allCourses.push({
                name: course.name,
                slug: course.slug,
                username: curUsername,
                description: course.description,
              });
            });
          });
      })
      .then(function () {
        res.render('index', {
          username: user.username,
          name: user.name,
          bio: user.bio,
          courses: userCourses,
          publicCourses: allCourses,
        });
      });
  } else {
    return models.User.findAll()
      .map(function (resUser) {
        const curUsername = resUser.username;
        return resUser.getCourses()
          .then(function (courses) {
            courses.forEach(function (course) {
              allCourses.push({
                name: course.name,
                slug: course.slug,
                username: curUsername,
                description: course.description,
              });
            });
          });
      })
      .then(function () {
        res.render('index', {
          publicCourses: allCourses,
        });
      });

  }
};
