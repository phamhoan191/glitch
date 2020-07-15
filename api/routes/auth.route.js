var express = require('express');
var router = express.Router();

var controller = require('../controller/auth.controller');

router.post('/', controller.postLogin);

module.exports = router;