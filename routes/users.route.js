var express = require('express');
var router = express.Router();

var controller = require('../controller/users.controller')
var validate = require('../validate/user.validate');

router.get('/', controller.usersIndex);

router.post('/add',  controller.usersAdd);
// validate.usersAdd, validate.usersEmail,

router.get('/:id/delete', controller.usersDelete);

router.post('/:id/edit', controller.usersEdit);

module.exports = router;