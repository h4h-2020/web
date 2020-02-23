var express = require('express');
var router = express.Router();
const db = require('../db') /* database wrapper */
var bcrypt = require('bcrypt'); /* cryptography stuff */ 
const passport = require('../auth') 

/* GET home page. */
router.get('/', async function(req, res, next) {
  const r = await db.query('SELECT * FROM users')
  console.log(r);
  res.render('index', { title: 'Boost', user: req.user && !req.user.is_admin, admin: req.user && req.user.is_admin });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', async function(req, res, next) {
  try {
    var pwd = await bcrypt.hash(req.body.password, 5);
    const user_id = await db.query('SELECT id FROM users WHERE "email"=$1 and "is_admin"=$2', [req.body.username, false])
    if (user_id.rowCount > 0) {
      console.log("this user exists")
      req.flash('info', "This emailed is already registered. <a href='/login'>Log in!</a>")
      res.redirect('/login');
    } else {
      console.log("this user doesn't exist")
      const insert = await db.query('INSERT INTO users (email, password, is_admin) VALUES ($1, $2, $3)', [req.body.username, pwd, false]);

      console.log(insert)

      if (insert) {
        console.log(insert)
        req.flash('info','user created.')
        res.redirect('/login');
      } else {
        req.flash('info', "Something went wrong");
        res.redirect('/register');
      }
    }
  } catch(e) {
    console.log(e)
    req.flash('info', "Something went wrong");
    res.redirect('/register');
  }
});

/* GET login page */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', flash: req.flash('info') });
});

/* GET listings page */
router.get('/listings', async function (req, res, next) {
  // pass different listings depending on the user's login condition
  var list = await db.query('SELECT * FROM social_services JOIN attributes ON attributes.id = social_services.attributes_id', []);
  list = list.rows
  var services_tags = await db.query('SELECT * FROM social_services_tags', []);
  services_tags = services_tags.rows
  var tags = await db.query('SELECT * FROM tags', []);
  tags = tags.rows

  const social_services =
    list.map((ss) => {
      return {
        ...ss,
        tags: services_tags
          .filter((st) => st.social_services_id == ss.id)
          .map((st) => tags.find((tag) => tag.id == st.tags_id).name)
      }
    })

  res.render('listings', { title: 'Listings', user: req.user && !req.user.is_admin, social_services } );
});

/* GET listings-hard page */
router.get('/listings-hard', function (req, res, next) {
  // pass different listings depending on the user's login condition
  res.render('listings-hard', { title: 'Listings', user: req.user && !req.user.is_admin});
});

/* Modify router to handle the submit button and confirm in database */
router.post('/login', passport.authenticate('userLocal', { failureRedirect: '/login' }), function(req, res, next) {
  res.redirect('/listings');
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('info', 'Your are logged out. See you soon!');
  res.redirect('/');
});

module.exports = router;
