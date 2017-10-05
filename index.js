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

//request info from api via search
app.post('/recipes', function(req, res) {
  var query = req.body.q;
  var recipepuppyUrl = "http://www.recipepuppy.com/api/?";
  recipepuppyUrl = recipepuppyUrl + "q=" + query;
  console.log(recipepuppyUrl);
  request(recipepuppyUrl, function(error, response, body){
    var recipes = JSON.parse(body).results;
    res.render('recipes', {recipes: recipes});

  });
  //will post to database
  db.favorite.findAll().then(function(fav){});
//find or create
db.favorite.findOrCreate({
  where: {name: 'Ginger Champagne',
        },
        defaults: {url: 'http://allrecipes.com/Recipe/Ginger-Champagne/Detail.aspx'}
}).spread(function(fav, created) {
  console.log(fav);
});
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

//must make function to show on page, function that grabs userId
app.get('/favorite/show', isLoggedIn, function(req, res) {
  res.render('favorite/show', {recipes: recipes});
});

app.get('/main/grocery', isLoggedIn, function(req, res) {
  res.render('main/grocery');
});

// app.get('/favorite/show', isLoggedIn, function(req, res) {
//   res.render('favorite/show');
// });


app.use('/auth', require('./controllers/auth'));
// app.use('/favorites', require('./controllers/favorites'));
//this is how we separate our routes into separate files
app.use('/favorite', require('./controllers/favorites'));
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
