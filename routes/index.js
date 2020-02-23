var express = require('express');
var router = express.Router();
const db = require('../db') /* database wrapper */
var bcrypt = require('bcrypt'); /* cryptography stuff */ 

/* GET home page. */
router.get('/', async function(req, res, next) {
  const r = await db.query('SELECT * FROM users')
  console.log(r);
  res.render('index', { title: 'Boost' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {
  // TODO: implement the functionality
  // refer to routes/admins.js
  // very similar but use users table instead of admins table
  res.redirect('/')
});

/* GET login page */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', flash: req.flash('info') });
});

/* GET listings page */
router.get('/listings', function (req, res, next) {
  res.render('listings', { title: 'Listings'} );
});

/* GET listings-hard page */
router.get('/listings-hard', function (req, res, next) {
  res.render('listings-hard', { title: 'Listings' });
});

/* Modify router to handle the submit button and confirm in database */
router.post('/login', async function(req, res, next) {
  try {
    const user = await db.query('SELECT id, password FROM "users" WHERE "email"=$1', [req.body.email])

    if (user.rowCount == 1) { /* Makes sure that the number of rows in the table that match the email are 1 (meaning email unique) */
      var r = await bcrypt.compare(req.body.password, user.rows[0].password)
      if (r) {
        req.flash('info', "Logged successfully.");
        res.redirect('/');
      } else {
        req.flash('info', "Login information incorrect");
        res.redirect('/login');
      }
    } else {
      req.flash('info', "Login information incorrect");
      res.redirect('/login');
    }
  } catch(e) {
    req.flash('info', "Login information incorrect");
    res.redirect('/login');
  }
});

module.exports = router;
