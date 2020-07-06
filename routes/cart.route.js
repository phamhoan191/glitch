var express = require('express');
var router = express.Router();

var controller = require('../controller/cart.controller');

router.get('/add/:bookId', controller.addToCart);

router.get('/complete', controller.completeCart);

module.exports = router;