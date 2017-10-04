var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');


// GET - return a page with my Favs
router.get('/recipes', function(req, res) {
  console.log("this is from sessions: ", req.session);
   //get everything from list db and render page.
  db.list.findAll().then(function(items) {
    console.log("those are my Recipes I think are great : ", items);
    res.render('favorite/show', {recipe: recipe});
  }).catch(function(err) {
    res.status(500).render('error');
  });
});

module.exports = router;
