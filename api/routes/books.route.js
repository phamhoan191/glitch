var express = require('express');
var router = express.Router();

var controller = require('../controller/books.controller')

router.get('/', controller.booksIndex);

module.exports = router;