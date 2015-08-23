var express = require('express');
var router = express.Router();

var indexCtrl = require('../controllers/index.ctrl');
var userCtrl = require('../controllers/user.ctrl');

/* GET home page. */
router.get('/', indexCtrl.default);

/* User register */
router.get('/join', userCtrl.getRegister);
router.post('/register', userCtrl.register);

/* User login */
router.get('/login', userCtrl.getLogin);
router.post('/login', userCtrl.login);

/* GET user page. */
router.get('/:user', userCtrl.default);

module.exports = router;
