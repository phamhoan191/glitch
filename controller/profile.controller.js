var User = require('../models/users.model');
var cloudinary = require('cloudinary').v2;


module.exports.profileIndex = async function(req, res) {
  res.render('profile', {
      user: await User.findById(req.signedCookies.userId)
  });
};

module.exports.profileAvatar = async function(req, res) {
  res.render('avatar', {
    user: await User.findById(req.signedCookies.userId)
  });
};

module.exports.postAvatar = async function(req, res) {
  cloudinary.config({
    cloud_name: 'dxuvh5pyg',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  const result = await cloudinary.uploader.upload(req.file.path);
  await User.findByIdAndUpdate(req.signedCookies.userId, { avatarUrl: result.url});
  res.redirect('avatar');
  
}