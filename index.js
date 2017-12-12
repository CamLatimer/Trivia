require('dotenv').load();

const express = require('express');
const app = express();
const api = require('./routes/api');
const pages = require('./routes/pages');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// setup a browser session and store sessions in a mongodb collection with connect-mongo
app.use(session({
  secret: 'secret sauce',
  resave: true,
  saveUninitialized: false,
  cookie:{
    maxAge: 24 * 60 * 60 * 1000,
    // secure: true
    // hook up security stuff (https, etc) in the future
  },
  store: new MongoStore({
    url: process.env.MONGOURI,
  // connect-mongo will use express-session's cookie.maxAge for expiration time,
  // else just set store.ttl like below:
  // ttl: 14 * 24 * 60 * 60 // = 14 days. Default} ),
  // mongo-connect will clear out stored sessions at the expiration time
  })
}));

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
