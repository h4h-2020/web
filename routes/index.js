var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const r = await db.query('SELECT * FROM users')
  console.log(r);
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

<<<<<<< HEAD
router.post('/register', function(req, res, next) {
  console.log(req);
  res.render('register', { title: 'Register' });
=======
/* GET login page */
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Express' });
>>>>>>> a39b84e4992c2f4e0698c27e4630fe0f3a87986d
});
module.exports = router;

/* modify router to handle the submit button */
router.post('/login', function(req, res, next) {
  console.log('Email: '+ req.body.login)
  console.log('Password: '+ req.body.password)
  res.redirect('/')
  });


