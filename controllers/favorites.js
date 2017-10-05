var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');

router.get('/recipes', function(req, res) {
    //get everything from pockemon db and render favotites page.
    db.favorite.findAll({
    }).then(function(recipes){
      res.render('favorite/show', { recipes: recipes });
    });
});

// POST - receive the name of a recipe and add it to the database
router.post('/recipes', function(req, res) {
  console.log('in the post to recipes favorite route ######');
    // add to database, adding raw to a table

    var recipeTitle = req.body.title;
    db.favorite.findOne({
      where:{
        title: recipeTitle
      }
    }).then(function(recipe){
      //recipe is the result of my query
      if(recipe === null){
        db.favorite.create({
          title: recipeTitle
        }).then(function(recipe){
          //here poke is what db returned from create
          console.log('created ', recipe.title);
          res.redirect('/favorite/show');
        });
      }else{
        console.log('already added: ', recipe.title);
        res.redirect('/recipe');
      }
    });

});

module.exports = router;
