var shortid = require('shortid');
var db = require('../db')

module.exports = {
  transactionIndex: function(req, res) {
    var user = db.get('users').find({ id: req.signedCookies.userId }).value();
    var admin = db.get('users').find({ isAdmin: true }).value();
    if (user === admin) {
      res.render('transaction', {
        transaction: db.get('transaction').value()
      });
    } else {
      res.render('transaction', {
        transaction: db.get('transaction').filter({ userId: user.name }).value()
      });
    }
  },
  
  transactionCreate: function(req, res) {
    res.render('transaction-create', {
      users: db.get('users').value(),
      books: db.get('books').value()
    });
  },
  
  transactionPostCreate: function(req, res) {
    req.body.id = shortid.generate();
    db.get('transaction').push(req.body).write();
    res.redirect('/transaction');
    // bạn ơi bạn có đó không ?
    // mình đây
    // ok cái phần mà bạn lưu session người mới vào là ở đây vậy bạn ? ở middleware hở bạn ?
    // trong middleware thì phải. Cái sessionMiddleware
  },
  
  transactionComplete: function(req, res) {
    var id = req.params.id;
    if (!db.get('transaction').find({ id: id }).value()) {
      res.render('transaction', {
        transaction: db.get('transaction').value(),
        errors: 'Không tìm thấy giao dịch.'
      });
      return;
    }
    db.get('transaction').find({ id: id }).assign({ isComplete: true }).write();
    res.redirect('/transaction')
  }
}