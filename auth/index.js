var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db')
const bcrypt = require('bcrypt');

passport.use('adminLocal', new LocalStrategy(
  async function(email, password, next) {
    try {
      const user = await db.query('SELECT id, password, is_admin FROM users WHERE "email"=$1 AND "is_admin"=$2', [email, true])


      if (user.rowCount == 1) {
        var r = await bcrypt.compare(password, user.rows[0].password)
        if (r) {
          return next(null, user.rows[0]);
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

passport.use('userLocal', new LocalStrategy(
  async function(email, password, next) {
    try {
      const user = await db.query('SELECT id, password, is_admin FROM users WHERE "email"=$1', [email])

      if (user.rowCount == 1) {
        var r = await bcrypt.compare(password, user.rows[0].password)
        if (r) {
          return next(null, user.rows[0]);
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
