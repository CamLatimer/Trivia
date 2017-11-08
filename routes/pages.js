const express = require('express');
const router = express.Router();
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// app.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false}))

// return the homepage
router.get('/', (req, res) => {
    res.render('home');
});

// admin routes
router.get('/admin', (req, res) => {
      res.render('admin/admin');
});


module.exports = router;
