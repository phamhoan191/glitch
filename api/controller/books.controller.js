var Book = require('../../models/books.model')

module.exports = {
  booksIndex: async function(req, res) {
    var books = await Book.find();
    res.json(books);
  }
}