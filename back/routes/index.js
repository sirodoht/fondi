var express = require('express');
var router = express.Router();

var indexCtrl = require('../controllers/index.ctrl');
var userCtrl = require('../controllers/user.ctrl');
var coursesCtrl = require('../controllers/courses.ctrl');

/* GET home page. */
router.get('/', indexCtrl.default);

/* User register */
router.get('/join', userCtrl.getRegister);
router.post('/register', userCtrl.register);

/* User login */
router.get('/login', userCtrl.getLogin);
router.post('/login', userCtrl.login);

router.get('/courses', coursesCtrl.list);
router.get('/courses/new', coursesCtrl.getCreate);
router.post('/courses', coursesCtrl.create);

// User page
router.get('/:user', userCtrl.default);

// User courses
// router.get('/:user/courses/create', coursesCtrl.create);

router.get('/following', userCtrl.default);

module.exports = router;
