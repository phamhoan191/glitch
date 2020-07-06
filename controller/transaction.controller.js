var User = require('../models/users.model');
var Book = require('../models/books.model');
var Transaction = require('../models/transaction.model');

module.exports = {
  transactionIndex: async function(req, res) {
    var allTransaction = await Transaction.find();
    res.render('transaction', {
      transaction: allTransaction
    });
  },
  
  transactionCreate: async function(req, res) {
    res.render('transaction-create', {
      users: await User.find(),
      books: await Book.find()
    });
  },
  
  transactionPostCreate: function(req, res) {
    var newTransaction = new Transaction(req.body);
    newTransaction.save(function(err) {
      if (err) return handleError(err);
    });
    res.redirect('/transaction');
  },
  
  transactionComplete: async function(req, res) {
    var id = req.params.id;
    var currTransaction = await Transaction.findById(id);
    if (!currTransaction) {
      res.render('transaction', {
        transaction: await Transaction.find(),
        errors: 'Không tìm thấy giao dịch.'
      });
      return;
    }
    await Transaction.findByIdAndUpdate(id, { isComplete: true });
    res.redirect('/transaction')
  }
}