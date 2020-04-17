const { User } = require("../model/index");
const passport = require('passport')
exports.renderSignup = (req, res) => {
  res.render("users/signup");
};

exports.signup = async (req, res) => {
  let users = [];
  const { name, email, password, password2 } = req.body;
  const userSelect = await User.findOne({ email: email });

  if (userSelect) {
    users.push({text: "email already exists",});
  }
  if (password !== password2) {
    users.push({ text: "password don not match" });
  }
  if (password.length <= 5) {
     users.push({ text: "password must be at least 5 characters"});
  }
  if (users.length > 0) {
    res.render("users/signup", { users, name, email });
  } else {
     const user = new User({
         name,
         email,
         password
     });

     user.password = await user.encryptPassword(user.password)
     await user.save();
     req.flash('success', 'you are registerd now' )
     res.status(200).redirect('/signin')
  }
};

exports.renderSignin = (req, res) => {
  res.render("users/signin");
};

exports.signin = passport.authenticate('login',{
    successRedirect:'/notes',
    failureRedirect:'/signin',
    failureFlash:true
   
}),(req, res) => {};

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/signin')
};
