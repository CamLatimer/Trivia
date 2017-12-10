const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/models');
const bodyParser = require('body-parser');

let User = db.User;

router.use(bodyParser.urlencoded({ extended: false}))

// for sessions:
// when user is authenticated at /login, req.session.sessionId cookie is set.
// home.ejs template will get a boolean set in the render method.
// home.ejs will inject a script tag that will set values to be used in bundle.js
// letting front end determine if user is logged in or not

// return the homepage
router.get('/', (req, res) => {
    if(req.session.sessionId && req.session.sessionEmail){
      res.render('home', {
        loggedIn: true,
        sessionEmail: `${req.session.sessionEmail}`
      });
    } else {
      res.render('home', {loggedIn: false});
    }
});

router.post('/register', bodyParser.json(), (req, res, next) => {

  // create a user document then set sessionId in a cookie
  if(req.body.email && req.body.password){
    let userToAdd = new User ({
      email: req.body.email,
      password: req.body.password
    });
    userToAdd.save(function(error, user){
      if(error){
        return next(error);
      } else {
        req.session.sessionId = user._id;
        req.session.sessionEmail = user.email
        return res.json({
          "sessionId": req.session.sessionId,
          "email": req.session.sessionEmail
        });
      }
    })
  } else {
    let err = new Error('all fields required!!!!');
    err.status = 400;
    return next(err);
  }
});

router.put('/login', bodyParser.json(), (req, res, next) => {
  
  // authenticate user and set browser sessionId in a cookie
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if(error || !user){
        var err = new Error('wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.sessionId = user._id;
        req.session.sessionEmail = user.email
        return res.json({
          "sessionId": req.session.sessionId,
          "email": req.session.sessionEmail
        });
      }
    });
  } else {
    var err = new Error('Email and password are required');
    err.status = 401;
    return next(err);
  }
})

router.put('/logout', (req, res, next) =>{
  req.session.destroy((err) => {
    if(err){
      return next(err)
    } else {
      res.json({
        loggedIn: false
      })
    }
  })
});

// admin routes
router.get('/admin', (req, res) => {
      res.render('admin/admin');
});


module.exports = router;
