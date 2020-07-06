var db = require('../db');
var shortid = require('shortid');

module.exports.addToCart = function(req, res, next) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {
    res.redirect('/books');
    return;
  }
  
  var count = db.get('sessions')
    .find({ id: sessionId })
    .get('cart.' + bookId, 0)
    .value();
  
  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + bookId, count + 1)
    .write();
  
  res.redirect('/books');
}

module.exports.completeCart = function(req, res, next) {
  if(!req.signedCookies.userId) {    
    res.redirect('/auth/login');
    return;
  }
  
  var currSession = db.get('sessions').find({ id: req.signedCookies.sessionId }).value();
  var listCart = [];
  var total = 0;
  for (var bookId in currSession.cart) {
    var book = db.get('books').find({id : bookId}).value(); // sao mìn không thấy nó logs gì ra ta ??? cái glitch lag đó
    book.quantity = currSession.cart[bookId];
    listCart.push(book);
    
    total += parseInt(currSession.cart[bookId]); // :v chac an 100% =))
  } 
  
  var user = db.get('users').find({ id: req.signedCookies.userId }).value();
  
  for (var item of listCart) {
    console.log(item);
    db.get('transaction').push({
      userId: user.name,
      bookId: item.name,
      quantity: item.quantity,
      isComplete: false,
      id: shortid.generate()
    }).write();
  }
  
  res.redirect('/books')
}
// à nhớ khi mà ~ add vào transaction thành công thì set listCart với total về [] với 0;

// mình đang tạo cái route complete ấn vào là tạo transaction từ cart
// mình bỏ auth ở books r tại đề bài yêu cầu vậy
