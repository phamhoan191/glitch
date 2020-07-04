var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  coverUrl: String
});

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;