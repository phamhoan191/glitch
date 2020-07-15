var Transaction = require('../../models/transaction.model');

module.exports = {
  transactionIndex: async function(req, res) {
    var allTransaction = await Transaction.find();
    res.json(allTransaction);
  }
}