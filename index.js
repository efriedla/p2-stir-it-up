require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var app = express();

// at the very top, require express-session
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
/*
 * setup the session with the following:
 *
 * secret: A string used to "sign" the session ID cookie, which makes it unique
 * from application to application. We'll hide this in the environment
 *
 * resave: Save the session even if it wasn't modified. We'll set this to false
 *
 * saveUninitialized: If a session is new, but hasn't been changed, save it.
 * We'll set this to true.
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
/*
 * Include the flash module by calling it within app.use().
 * IMPORTANT: This MUST go after the session module
 */
app.use(flash());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

//these three lines must occur after the session the notes are liers
var passport = require('./config/ppConfig');
// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('main/index');
});



app.get('/main/recipesearch', function(req, res) {
  res.render('main/recipesearch');
});

app.get('/search/:recipe', function(req, res) {
  var url = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&';

  request({
    url: url,
    qs: {
      limit: 20,
      api_key: 'dc6zaTOxFJmzC',
      q: req.params.foo
    },
    json: true
  }, function(error, response, body) {

    res.render('main/recipesearch', {data: body.data});
  });
});


//will only let the ppl who are signed in see
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.get('/recipes', function(req, res) {
  res.render('recipes');
});

app.get('/main/favorites', isLoggedIn, function(req, res) {
  res.render('main/favorites');
});

app.get('/main/grocery', isLoggedIn, function(req, res) {
  res.render('main/grocery');
});


app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
