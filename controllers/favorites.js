var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');


router.post('/', function(req, res) {
  // console.log('in the favorites show post route #######');
  db.favorite.findOrCreate({
    where:  {
      name: req.body.name,
      url: req.body.url,
      ingredient: req.body.ingredient
      }
    }).spread(function(recipes){
        //var arr = [];

          console.log(recipes.ingredient);
      res.render('favorite/show', {recipes: recipes})

    })

      .catch(function(error) {
          res.status(400).render('main/404');
          console.log("nooooo");
      });
});

// GET - return a page with favorites
router.get('/show', function(req, res) {
    //get everything from all
    db.favorite.findAll({
    }).then(function(recipes){
      res.render('favorite/show', { recipes: recipes });
    });
});

module.exports = router;
