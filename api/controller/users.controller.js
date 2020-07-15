var User = require('../../models/users.model');

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
    res.json(users);
  },
  
  usersAdd: async function(req, res) {
    var user = await User.create(req.body);
    res.json(user);
  }
}