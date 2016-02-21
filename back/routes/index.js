var express = require('express');
var router = express.Router();
var passport = require('passport');

var indexCtrl = require('../controllers/index.ctrl');
var userCtrl = require('../controllers/user.ctrl');
var coursesCtrl = require('../controllers/courses.ctrl');

/* API routes */
router.post('/register', userCtrl.register);
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/courses', coursesCtrl.list);
router.post('/courses', coursesCtrl.create);

/* Frontend routes */
router.get('/', indexCtrl.getIndex);

router.get('/join', userCtrl.getRegister);
router.get('/login', userCtrl.getLogin);

router.get('/courses/new', coursesCtrl.getCreate);
router.get('/courses/new/github', coursesCtrl.getCreateGithub);

router.get('/:user', userCtrl.getUser);
// router.get('/:user/courses', coursesCtrl.create);

router.get('/following', userCtrl.getUser);

module.exports = router;
