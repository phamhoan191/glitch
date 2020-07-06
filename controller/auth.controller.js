var bcrypt = require('bcrypt');

var mailgun = require('mailgun-js');

var User = require('../models/users.model');

module.exports.login = function(req, res) {
  res.render('auth/login');
};

module.exports.postLogin = async function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  var user = await User.findOne({ email: email });
  
  if (!user) {
    res.render('auth/login', {
      errors: [
        'Người dùng không tồn tại'
      ],
      values: req.body
    });
    return;
  }
  
  // khi register
  // var hash = await bcrypt.hash('123123', 10);
  
  var isPasswordCorrect = await bcrypt.compare(password, user.password);
  var wrongLoginCount = await User.find({ email: email }).wrongLoginCount ? User.find({ email: email }).wrongLoginCount : 0;
  
  if (wrongLoginCount > 3) {
    var mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});
    var data = {
      from: 'phamhoan191@mailgun.org',
      to: 'phamhoan191@gmail.com',
      subject: 'Thông báo đăng nhập sai nhiều lần',
      text: 'Bạn đã đăng nhập sai quá 3 lần. Đây là tin nhắn tự động từ hệ thống'
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
  }
    
  if (!isPasswordCorrect || wrongLoginCount > 3) {
    res.render('auth/login', {
        errors: [
          'Mật khẩu không đúng'
        ],
        values: req.body
    });
    wrongLoginCount++;
    console.log(wrongLoginCount);
    User.find({ email: email }).update({ wrongLoginCount: wrongLoginCount });
    return;
  }
      
  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/transaction');
};