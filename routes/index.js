var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/* GET login page */
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Express' });
});
module.exports = router;

/* modify router to handle the submit button */
router.post('/login', function(req, res, next) {
  console.log('Email: '+ req.body.login)
  console.log('Password: '+ req.body.password)
  res.redirect('/')
  });


