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

/* Frontend routes */
router.get('/', indexCtrl.getIndex);

router.get('/join', userCtrl.getRegister);
router.post('/register', userCtrl.register);
router.get('/login', userCtrl.getLogin);
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/courses/new', coursesCtrl.getCreate);
router.get('/courses/:courseId/edit', coursesCtrl.getEdit);

router.get('/:username', userCtrl.getUser);

module.exports = router;
