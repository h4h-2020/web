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

module.exports = router;
