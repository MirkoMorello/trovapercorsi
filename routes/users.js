var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var user = require ('../models/user.js');
var passport = require('passport');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  console.log("\n\n\n----------------------------------"+req.body.email)
  if (password != password2){
    res.render("register")
    return;
  }
  let newUser = new user({
    name: name,
    email: email,
    username: username,
    password: password
  })

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(function(err){
        if (err){
          console.log(err);
          return;
        }
        res.render("register")
      });
    });
  })
  res.redirect("login")
});

// Login form
router.get('/login', function(req, res, next) {
  res.render('login');
});


//login process
router.post('/login', function(req, res, next){
  console.log("sei in post"+req.body.username)
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: false
  })(req, res, next);
});

//logout process
router.get('/logout', function(req, res){
  req.logout();
  //req.flash('success', 'Hai effettuato logout');
  res.redirect('/users/login');
})

module.exports = router;
 