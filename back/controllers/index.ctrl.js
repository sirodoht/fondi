var models = require('../models');

var indexCtrl = module.exports = {};

indexCtrl.getIndex = function (req, res) {
  let user = null;
  let userCourses = null;

  if (req.user) {
    models.User.findOne({
      where: {
        id: req.user.id,
      },
    })
      .then(function (resUser) {
        user = resUser;
        return resUser.getCourses({raw: true})
      })
      .then(function (resCourses) {
        userCourses = resCourses;
        return models.Course.findAll();
      })
      .then(function (resCourse) {
        res.render('index', {
          username: user.username,
          name: user.name,
          bio: user.bio,
          courses: userCourses,
          publicCourses: resCourse,
        });
      });
  } else {
    models.Course.findAll()
      .then(function (courses) {
        res.render('index', {
          publicCourses: courses,
        });
      });
  }
};
