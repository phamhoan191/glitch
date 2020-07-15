var express = require('express');
var router = express.Router();

var controller = require('../controller/users.controller')
// var validate = require('../validate/user.validate');

router.get('/', controller.usersIndex);

router.post('/',  controller.usersAdd);
// validate.usersAdd, validate.usersEmail,

module.exports = router;