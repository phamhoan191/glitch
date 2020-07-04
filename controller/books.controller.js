var shortid = require('shortid');
var Book = require('../models/books.model');
var cloudinary = require('cloudinary').v2;

module.exports = {
  booksIndex: async function(req, res) {
    var books = await Book.find();
    res.render('books', {
      books: books
    });
  },
  
  booksAdd: async function(req, res) {
    req.body.id = shortid.generate();
    req.body.coverUrl = req.file.path.split('/').slice(1).join('/');
    var books = await Book.find();
    books.create(req.body);
    res.redirect('/books');
  },
  
  booksDelete: function(req, res) {
    var id = req.params.id;
    db.get('books').remove({ id: id }).write();
    res.redirect('/books');
  },
  
  booksEdit: function(req, res) {
    var id = req.params.id;
    db.get('books').find({ id: id }).assign(req.body).write();
    res.redirect('/books');
  }
  
}