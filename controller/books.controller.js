var Book = require('../models/books.model')

module.exports = {
  booksIndex: async function(req, res) {
    var books = await Book.find();
    res.render('books', {
      books: books
    });
  },
  
  booksAdd: function(req, res) {
    req.body.coverUrl = req.file.path.split('/').slice(1).join('/');
    var newBook = new Book(req.body);
    newBook.save(function(err) {
      if (err) return handleError(err);
    });
    res.redirect('/books');
  },
  
  booksDelete: async function(req, res) {
    var id = req.params.id;
    await Book.deleteOne({ _id: id }, function(err) {
      if (err) return handleError(err);
    })
    res.redirect('/books');
  },
  
  booksEdit: async function(req, res) {
    var id = req.params.id;
    await Book.find({ _id: id }).updateOne(req.body, function(err, res) {

    });
    res.redirect('/books');
  }
  
}