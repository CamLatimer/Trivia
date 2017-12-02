const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect to mongodb
function dbConnect(){
  mongoose.connect(process.env.MONGOURI, {useMongoClient: true}, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('connected to mongodb');
    }
  });
  const db = mongoose.connection;
}

function testLog(){
  console.log('testin 123');
}

// create schemas & models
  const userSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    username: String
  })
const User = mongoose.model('User', userSchema);

module.exports = {
  testLog: testLog,
  dbConnect: dbConnect,
  User: User
}
