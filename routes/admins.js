var express = require('express');
var router = express.Router();
const db = require('../db')

router.get('/register', function(req, res, next) {
  res.render('admins/register', { title: 'Register' });
});

/* GET login page */
router.get('/login', function (req, res, next) {
  res.render('admins/login', { title: 'Express' });
});

/* modify router to handle the submit button */
router.post('/login', function(req, res, next) {
  console.log('Email: '+ req.body.login)
  console.log('Password: '+ req.body.password)
  res.redirect('/')
});

router.post('/login', function(req, res, next) {
  console.log('Email: '+ req.body.login)
  console.log('Password: '+ req.body.password)
  res.redirect('/')
});

module.exports = router;
