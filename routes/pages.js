const express = require('express');
const router = express.Router();
const db = require('../db/database');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let User = db.User;

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false}))

// return the homepage
router.get('/', (req, res) => {
    res.render('home');
});

router.post('/register', bodyParser.json(), (req, res, next) => {
  if(req.body.email && req.body.password){
    let userData = {
      email: req.body.email,
      password: req.body.password
    };
    User.create(userData, function(error, user){
      if(error){
        return next(error);
      } else {
        return res.json(req.status);
      }
    })
  } else {
    let err = new Error('all fields required!!!!');
    err.status = 400;
    return next(err);
  }
});

// return the game page
router.get('*', (req, res) => {
    res.redirect('/');
});

// admin routes
router.get('/admin', (req, res) => {
      res.render('admin/admin');
});


module.exports = router;
