var bcrypt = require('bcrypt');
var User = require('../models/users.model');

module.exports = {
  usersIndex: async function(req, res) {
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 2;
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    // res.render('users', {
    //   users: db.get('users').value().slice(start, end),
    //   page: parseInt(req.query.page) || 1
    // });
    var users = await User.find();
    res.render('users', {
      users: users
    })
  },
  
  usersAdd: async function(req, res) {
    var password = await bcrypt.hash(req.body.password, 10);
    req.body.password = password;
    var newUser = new User(req.body);
    await newUser.save(function(err) {
      if (err) console.log(err)
    });
    res.redirect('/users');
  },
  
  usersDelete: async function(req, res) {
    var id = req.params.id;
    await User.deleteOne({ _id: id }, function(err) {
      if (err) console.log(err)
    });
    res.redirect('/users');
  },
  
  usersEdit: async function(req, res) {
    var id = req.params.id;
    await User.find({ _id: id }).updateOne(req.body, function(err, res) {

    });
    res.redirect('/users');
  }
}