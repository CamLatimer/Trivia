const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// connect to mongodb
mongoose.connect(process.env.MONGOURI, {useMongoClient: true}, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected to mongodb');
  }
});
const db = mongoose.connection;


// create schemas & models
const userSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  email: {
    type:String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accuracy: {type: Number, default: 0},
  attempts: {type: Number, default: 0},
  correct: {type: Number, default: 0}
})

// authenticate users
// statics object lets you add methods directly to the model so you can call the method on the model elsewhere in the app.
userSchema.statics.authenticate = function(email, password, callback){
  User.findOne({email: email}, function(error, user){
      if(error){
        return callback(error)
      } else if(!user){
        let err = new Error('user not found...');
        err.status = 401;
        return callback(err);
      }
        // compare supplied password with hashed version
        bcrypt.compare(password, user.password, function(error, result){
          // if password matches, return null with user document. null will represent an error
          if(result === true){
            return callback(null, user)
          } else {
            return callback();
          }
        });
  })
}
// hash password before saving to database
userSchema.pre('save', function(next){
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});
const User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
