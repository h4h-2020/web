var express = require('express');
var router = express.Router();
const db = require('../db')

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
  res.render('login', { title: 'Express' });
});


/* GET listings page */
router.get('/listings', function (req, res, next) {
  res.render('listings', { title: 'Express' });
});


/* modify router to handle the submit button */
router.post('/login', function(req, res, next) {
  // TODO: implement the functionality
  // refer to routes/admins.js
  // very similar but use users table instead of admins table
  res.redirect('/')
});

module.exports = router;
