var db = require('../db');

module.exports.usersAdd = function(req, res, next) {
  if (req.body.name.length > 30) {
    res.render('users', {
      users: db.get('users').value(),
      errors: 'Tên người dùng quá dài'
    });
    return;
  };
  next();
};

module.exports.usersEmail = function(req, res, next) {
  if (db.get('users').find({ email: req.body.email }).value()) {
    res.render('users', {
      users: db.get('users').value(),
      errors: 'Email đã tồn tại'
    });
    return;
  };
  next();
};