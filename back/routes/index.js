var express = require('express');
var router = express.Router();

var homeCtrl = require('../controllers/home.ctrl');
var userCtrl = require('../controllers/user.ctrl');

/* GET home page. */
router.get('/', homeCtrl.default);

/* User register */
router.get('/join', userCtrl.getRegister);
router.post('/register', userCtrl.register);

/* GET user page. */
router.get('/:user', userCtrl.default);

module.exports = router;
