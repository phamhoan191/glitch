var express = require('express');
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/booksCover' });

var controller = require('../controller/books.controller')

router.get('/', controller.booksIndex);

router.post('/add', upload.single('cover'), controller.booksAdd);

router.get('/:id/delete', controller.booksDelete);

router.post('/:id/edit', controller.booksEdit);

module.exports = router;