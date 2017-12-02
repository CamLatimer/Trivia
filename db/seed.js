
require('dotenv').load();
// seed the database with dummy data

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 27017 is mongodb's default port
mongoose.connect(process.env.MONGOURI, {useMongoClient: true}, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected to mongodb');
  }
});
const db = mongoose.connection;

db.on('open', function(){

// create schemas & models
  const userSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    email: String
  })
  const User = mongoose.model('User', userSchema);

// remove previous collection(s).  when done, create and save new models, then close the db

  User.remove({}, (err, documents) => {
      if(err){
        console.log(err);
      } else {

        // create some documents
        const theOg = new User({
          email: 'og_user@test.com',
          password: 'password'
        })

        const testUser = new User({
          email: 'testUser@test.com',
          password: 'password'
        })


        // save the documents to the db
        const docs = [theOg, testUser];

          docs.forEach((doc, index) => {
          doc.save((err) => {
            if(err) {
              console.log(err);
            } else {
              if(index === docs.length - 1){
                db.close(() => {
                  console.log('collections loaded, connection closed.');
                })
              }
            }
        })
      })
    }
  })
  // close connection
})
