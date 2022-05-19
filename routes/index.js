var express = require('express');
var router = express.Router();
var User = require('../models/user');
// GET and POST login
router.get('/login', function(req,res,next){
  return res.render('login',{ title: 'Log In'});
});
router.post('/login' function(req,res,next){
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function (error, user){
      if(error || !user){
        var err = new Error('Something is wrong');
        err.status = 401;
        return next(err);
      }else{
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  }else{
    var err = new Error ('The fields email and password are necessary.');
    err.status = 401;
    return next(err);
  }
});
// GET / register
router.get('/register', (req,res,next) => {
  return res.render('register', { title: 'Sign up'});
});

//POST/ Register
router.post('/register', (req,res,next)=>{
  if (req.body.email &&
      req.body.name &&
      req.body.favoriteBook &&
      req.body.password &&
      req.body.confirmPassword){
        if(req.body.password !== req.body.confirmPassword){
          var err = new Error('Passwords not matching, retype them.');
          err.status = 400;
          return next(err);
        }
        var userInfo = {
          email: req.body.email,
          name: req.body.name,
          favoriteBook: req.body.favoriteBook,
          password: req.body.password
        }
        //inserting the user information 'userInfo' into mongodb
        User.create(userInfo, (error, user)=>{
          if (error){
            return next(error);
          } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
          }
        });
      } else{
        var err = new Error('Fill all fields, dear one.');
        err.status = 400;
        return next(err);
      }
});
// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
