var db = require('../db');

module.exports.userAuth = function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }
  
  var user = db.get('users').find({ id: req.signedCookies.userId }).value();
  
  if (!user) {
    res.redirect('/auth/login');
    return;
  }
  
  next();
}

module.exports.adminAuth = function(req, res, next) {
  var user = db.get('users').find({ id: req.signedCookies.userId }).value();
  var admin = db.get('users').find({ isAdmin: true }).value();
  if (user !== admin) {
    res.render('transaction', {
      errors: 'Bạn phải là admin.',
      transaction: db.get('transaction').filter({ userId: user.name }).value()
    });
    return;
  };
  next();
}