require('dotenv').load();

const express = require('express');
const app = express();
const db = require('./db/database');
const api = require('./routes/api');
const pages = require('./routes/pages');
db.dbConnect();

// serve static files from /dist, use '/dist' as a mount path for proxies, middleware, etc.
app.use('/dist', express.static('dist'))
app.set('view engine', 'ejs');

// include routes
app.use('/', pages);
app.use('/api', api);

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 8080, () => {
    console.log('The application is running on localhost:3000!')
});
