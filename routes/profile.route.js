var express = require('express');
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

var controller = require('../controller/profile.controller')

router.get('/', controller.profileIndex);

router.get('/avatar', controller.profileAvatar);

router.post('/avatar', upload.single('avatar'), controller.postAvatar);


module.exports = router;