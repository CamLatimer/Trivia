const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const db = require('../db/models');

let User = db.User;
// Users
// GET /Users
// subroutes will be added on to the url specified in index.js

// return all the Users
router.get('/users', (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
})

// return all the Users
router.get('/users', (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
})

// POST /user
// create a user
router.post('/users',bodyParser.json(), (req, res) => {
  let userToAdd = new User(req.body);
  userToAdd.save((err, user) => {
    if(err) console.log(err);
    res.json(user);
  })
})

// GET /users/:uId
// Route to a user by id
router.get('/users/:uId', bodyParser.urlencoded({ extended: false}), (req, res) => {
  console.log(req.params);
  User.find({_id: req.params.uId}, (err, data) => {
    res.json(data);
  });
})

module.exports = router;
