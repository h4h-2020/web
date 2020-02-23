var express = require('express');
var router = express.Router();
const db = require('../db')
var bcrypt = require('bcrypt');

router.get('/register', async function(req, res, next) {
  // const r = await db.query('SELECT * FROM admins')
  res.render('admins/register', { title: 'Register' });
});

/* GET login page */
router.get('/login', function (req, res, next) {
  res.render('admins/login', { title: 'Express' });
});

/* modify router to handle the submit button */
router.post('/login', async function(req, res, next) {
  try {
    const user = await db.query('SELECT id, password FROM "users" WHERE "email"=$1', [req.body.email])

    if (user.rowCount == 1) {
      var r = await bcrypt.compare(req.body.password, user.rows[0].password)
      if (r) {
        req.flash('success', "Logged successfully.");
        res.redirect('/');
      } else {
        req.flash('warning', "Login information incorrect");
        res.redirect('/admins/login');
      }
    } else {
      req.flash('warning', "Login information incorrect");
      res.redirect('/admins/login');
    }
  } catch(e) {
    req.flash('warning', "Login information incorrect");
    res.redirect('/admins/login');
  }
});

router.post('/register', async function (req, res, next) {
  try {
    var pwd = await bcrypt.hash(req.body.password, 5);
    const user_id = await db.query('SELECT id FROM admins WHERE "email"=$1', [req.body.email])
    if (user_id.rowCount > 0) {
      console.log("this admin exists")
      req.flash('warning', "This emailed is already registered. <a href='/login'>Log in!</a>")
      res.redirect('/admins/login');
    } else {
      console.log("this admin doesn't exist")
      const insert = await db.query('INSERT INTO admins (email, password) VALUES ($1, $2)', [req.body.email, pwd]);

      console.log(insert)

      if (insert) {
        console.log(insert)
        req.flash('success','Admin created.')
        res.redirect('/admins/login');
      } else {
        req.flash('warning', "Something went wrong");
        res.redirect('/admins/register');
      }
    }
  } catch(e) {
    console.log(e)
    req.flash('warning', "Something went wrong");
    res.redirect('/admins/register');
  }
});

module.exports = router;
