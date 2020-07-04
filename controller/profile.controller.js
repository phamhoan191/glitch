var db = require('../db');
var cloudinary = require('cloudinary').v2;


module.exports.profileIndex = function(req, res) {
  res.render('profile', {
      user: db.get('users').find({ id: req.signedCookies.userId }).value()
  });
};

module.exports.profileAvatar = function(req, res) {
  res.render('avatar', {
    user: db.get('users').find({ id: req.signedCookies.userId }).value()
  });
};

module.exports.postAvatar = async function(req, res) {
  cloudinary.config({
    cloud_name: 'dxuvh5pyg',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  const result = await cloudinary.uploader.upload(req.file.path);
  db.get('users').find({ id: req.signedCookies.userId }).assign({ avatarUrl: result.url }).write();
  res.redirect('avatar');
  
}