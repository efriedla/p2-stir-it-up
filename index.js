require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('./models')
var moment = require('moment');

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

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// middleware that allows us to access the 'moment' library in every EJS view
app.use(function(req, res, next) {
  res.locals.moment = moment;
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

app.post('/recipes', function(req, res) {
  var query = req.body.q;
  var recipepuppyUrl = "http://www.recipepuppy.com/api/?";
  recipepuppyUrl = recipepuppyUrl + "q=" + query;
  console.log(recipepuppyUrl);
  request(recipepuppyUrl, function(error, response, body){
    var recipes = JSON.parse(body).results;
    res.render('recipes', {recipes: recipes});

  });
});

app.get('/recipes/:index', function(req, res) {
    var index = parseInt(req.params.index);
    if (index < articles.length && index >= 0) {
        res.render('articles/show', { article: articles[req.params.index] });
    } else {
        res.send('Error');
    }
});

app.get('/recipes', function(req, res) {
  res.render('main/recipesearch');
});


//will only let the ppl who are signed in see
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

// app.get('/recipes', function(req, res) {
//   res.render('recipes');
// });

app.get('/main/favorites', isLoggedIn, function(req, res) {
  res.render('main/favorites');
});

app.get('/main/grocery', isLoggedIn, function(req, res) {
  res.render('main/grocery');
});


app.use('/auth', require('./controllers/auth'));
// app.use('/main/favorites', require('./controllers/favorites'));
//this is how we separate our routes into separate files
//app.use('/recipes', require('./controllers/favorites'));
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
