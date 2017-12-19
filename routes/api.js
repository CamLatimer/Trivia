const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const db = require('../db/models');

let User = db.User;
// Users
// GET /Users
// subroutes will be added on to the url specified in index.js

// POST /user
// create a user
router.post('/users',bodyParser.json(), (req, res) => {
  let userToAdd = new User(req.body);
  userToAdd.save((err, user) => {
    if(err) console.log(err);
    res.json(user);
  })
})


module.exports = router;
