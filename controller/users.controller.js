var shortid = require('shortid');
var bcrypt = require('bcrypt');
var db = require('../db');

module.exports = {
  usersIndex: function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 2;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    res.render('users', {
      users: db.get('users').value().slice(start, end),
      page: parseInt(req.query.page) || 1
    });
  },
  
  usersAdd: async function(req, res) {
    req.body.id = shortid.generate();
    var password = await bcrypt.hash(req.body.password, 10);
    req.body.password = password;
    db.get('users').push(req.body).write();
    res.redirect('/users');
  },
  
  usersDelete: function(req, res) {
    var id = req.params.id;
    db.get('users').remove({ id: id }).write();
    res.redirect('/users');
  },
  
  usersEdit: function(req, res) {
    var id = req.params.id;
    db.get('users').find({ id: id }).assign(req.body).write();
    res.redirect('/users');
  }
}