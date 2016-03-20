var express = require('express');
var router = express.Router();
var passport = require('passport');

var indexCtrl = require('../controllers/index.ctrl');
var userCtrl = require('../controllers/user.ctrl');
var coursesCtrl = require('../controllers/courses.ctrl');

/* API routes */
router.get('/courses', coursesCtrl.list);
router.post('/courses', coursesCtrl.create);
router.post('/courses/:courseId', coursesCtrl.edit);
router.get('/courses/:courseId/:sectionId', coursesCtrl.sections);

/* Frontend routes */
router.get('/', indexCtrl.getIndex);

router.get('/join', userCtrl.getRegister);
router.post('/register', userCtrl.register);
router.get('/login', userCtrl.getLogin);
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/profile', userCtrl.getUser);
router.get('/new', coursesCtrl.getCreate);
router.get('/:username', coursesCtrl.getOwnCourses);
router.get('/:username/:courseId', coursesCtrl.getCourse);
router.get('/:username/:courseId/edit', coursesCtrl.getEditCourse);
router.get('/:username/:courseId/new', coursesCtrl.getNewSection);
router.get('/:username/:courseId/:sectionId', coursesCtrl.getSection);

module.exports = router;
