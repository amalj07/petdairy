const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/official');
const config = require('../config/database');


module.exports = (passport) => {
  //Implement local strategy
  passport.use(new LocalStrategy( (email, password, done) => {
    //Match username
    let query = {email:email};
    User.findOne(query, (err, user) => {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found!'});
      }

      //Match password
      let query = {password: password}
      if(password != user.password) {
        return done(null, false, {message: 'Wrong password!'});
      } else {
        return done(null, user);
      }
    });
  }));

  passport.serializeUser( (official, done) => {
    done(null, official.id);
  });

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
