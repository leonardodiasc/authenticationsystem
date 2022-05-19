var express = require('express');
var router = express.Router();
var User = require('../models/user');
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
