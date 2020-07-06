var i = 0;
module.exports.count = function(req, res, next) {
  if (req.cookies) {
    i++;
    console.log(req.cookies.count + ' count: ' + i);
  };
  next();
};