require('dotenv').load();

const express = require('express');
const app = express();
const db = require('./db/database');
const api = require('./routes/api');
const pages = require('./routes/pages');
db.dbConnect();

// serve static files from /dist, use '/dist' as a mount path for proxies, middleware, etc.
app.use('/dist', express.static('dist'))

app.use('/', pages);
app.use('/api', api);

app.set('view engine', 'ejs');

app.listen(process.env.PORT || 8080, () => {
    console.log('The application is running on localhost:3000!')
});
