var express = require('express');
var router = express.Router();

var controller = require('../controller/transaction.controller')

router.get('/', controller.transactionIndex);

module.exports = router;