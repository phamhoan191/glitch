var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var db = require('../db')

var controller = require('../controller/transaction.controller')

router.get('/', controller.transactionIndex);

router.get('/create', controller.transactionCreate);

router.post('/create', controller.transactionPostCreate);

router.get('/:id/complete', controller.transactionComplete);

module.exports = router;