var User = require('../../models/users.model');
var bcrypt = require('bcrypt');

module.exports.postLogin = async function(req, res) {
    var user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.render('users', {
            errors: "Người dùng không tồn tại."
        });
        return;
    }
    var password = req.body.password;
    var isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
        res.redirect('transaction');
    } else {
        res.render('users', {
            errors: "Sai mật khẩu."
        })
    }
};