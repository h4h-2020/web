var express = require('express');
var router = express.Router();
const db = require('../db')
var bcrypt = require('bcrypt');
const passport = require('../auth')

router.get('/register', function(req, res, next) {
  res.render('admins/register', { title: 'Register', flash: req.flash('info') });
});

/* GET login page */
router.get('/login', function (req, res, next) {
  res.render('admins/login', { title: 'Login', flash: req.flash('info') });
});

/* modify router to handle the submit button */
router.post('/login', passport.authenticate('adminLocal', { failureRedirect: '/admins/login' }), function(req, res, next) {

  res.redirect('/admins/manage');
});

router.post('/register', async function (req, res, next) {
  try {
    var pwd = await bcrypt.hash(req.body.password, 5);
    const user_id = await db.query('SELECT id FROM users WHERE "email"=$1 and "is_admin"=$2', [req.body.username, true])
    if (user_id.rowCount > 0) {
      console.log("this admin exists")
      req.flash('info', "This emailed is already registered. <a href='/login'>Log in!</a>")
      res.redirect('/admins/login');
    } else {
      console.log("this admin doesn't exist")
      const insert = await db.query('INSERT INTO users (email, password, is_admin) VALUES ($1, $2, $3)', [req.body.username, pwd, true]);

      console.log(insert)

      if (insert) {
        console.log(insert)
        req.flash('info','Admin created.')
        res.redirect('/admins/login');
      } else {
        req.flash('info', "Something went wrong");
        res.redirect('/admins/register');
      }
    }
  } catch(e) {
    console.log(e)
    req.flash('info', "Something went wrong");
    res.redirect('/admins/register');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('info', 'Your are logged out. See you soon!');
  res.redirect('/');
});

router.get('/manage', async function(req, res, next) {
  if (req.user && req.user.is_admin) {
    console.log(req.user.is_admin)
    res.render('admins/manage', { title: 'Manage social services', admin: true});
  } else {
    req.flash('info','You are not authenticated');
    res.redirect('/');
  }
});

/* GET admin dashboard page */
router.get('/dashboard', async function (req, res, next) {
  res.render('admins/dashboard', { title: 'Admin Dashboard' });
});

module.exports = router;
