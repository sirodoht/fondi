var express = require('express');
var router = express.Router();
var passport = require('passport');

var indexCtrl = require('../controllers/index.ctrl');
var userCtrl = require('../controllers/user.ctrl');
var coursesCtrl = require('../controllers/courses.ctrl');
var authMidd = require('../middleware/auth.midd');

router.post('/courses', coursesCtrl.create);
router.post('/courses/:courseId', coursesCtrl.edit);

router.get('/', indexCtrl.getIndex);

router.get('/join', userCtrl.getRegister);
router.post('/register', userCtrl.register);
router.get('/login', userCtrl.getLogin);

// @see https://github.com/jaredhanson/passport/issues/482
router.post('/login', [
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),
  authMidd.check,
]);
router.get('/logout', [
  userCtrl.logout,
  authMidd.check,
]);

router.get('/new', [authMidd.authOnly, coursesCtrl.getCreate]);
router.post('/new', [authMidd.authOnly, coursesCtrl.create]);
router.get('/:username', coursesCtrl.getOwnCourses);
router.get('/:username/:courseId', coursesCtrl.getCourse);
router.post('/:username/:courseId', coursesCtrl.sectionNew);
router.get('/:username/:courseId/edit', [authMidd.authOnly, coursesCtrl.getEditCourse]);
router.get('/:username/:courseId/new', [authMidd.authOnly, coursesCtrl.getNewSection]);
router.get('/:username/:courseId/:sectionId', coursesCtrl.getSection);

module.exports = router;
