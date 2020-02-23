var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db')
const bcrypt = require('bcrypt');

passport.use('adminLocal', new LocalStrategy(
  async function(email, password, next) {
    try {
      const user = await db.query('SELECT id, password FROM admins WHERE "email"=$1', [email])
      console.log(email);
      console.log(password);

      if (user.rowCount == 1) {
        var r = await bcrypt.compare(password, user.rows[0].password)
        if (r) {
          console.log("should not trigger")
          return next(null, user);
        } else {
          next(null, false);
        }
      } else {
        console.log("should trigger")
        next(null, false);
      }
    } catch(e) {
      console.log(e)
      next(null, false);
    }
  }
));

passport.use('userLocal', new LocalStrategy(
  async function(email, password, next) {
    try {
      const user = await db.query('SELECT id, password FROM users WHERE "email"=$1', [email])

      if (user.rowCount == 1) {
        var r = await bcrypt.compare(password, user.rows[0].password)
        if (r) {
          next(null, user);
        } else {
          next(null, false);
        }
      } else {
        next(null, false);
      }
    } catch(e) {
      next(null, false);
    }
  }
));

passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if(user!=null)
    done(null,user);
});

module.exports = passport;
