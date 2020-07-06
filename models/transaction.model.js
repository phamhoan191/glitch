var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  isComplete: String
});

var Transaction = mongoose.model('Transaction', transactionSchema, 'transaction');

module.exports = Transaction;