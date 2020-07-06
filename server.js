// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
 
const booksRoute = require('./routes/books.route');
const usersRoute = require('./routes/users.route');
const transactionRoute = require('./routes/transaction.route');
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const cartRoute = require('./routes/cart.route');

const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');
const cookieCount = require('./middleware/cookie.count');

app.set('view engine', 'pug');
app.set('views', './views');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('fatygvnscb'));
app.use(sessionMiddleware)

app.use(express.static('public'));

app.get('/', function(req, res, next) {
  res.cookie('count', 'visit');
  next();
}, cookieCount.count, function(req, res) {
  res.render('index');
});

app.use('/users',  usersRoute);
// authMiddleware.userAuth, authMiddleware.adminAuth,

// =====================================

app.use('/books', booksRoute);

// =========================================

app.use('/transaction',  transactionRoute);
// authMiddleware.userAuth,

// ========================================

app.use('/auth', authRoute);

// ========================================

app.use('/profile', authMiddleware.userAuth, profileRoute);

// ========================================

app.use('/cart', cartRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
