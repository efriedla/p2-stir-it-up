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

// // POST - receive the name of a recipe and add it to the database
// router.post('/favorites/show', function(req, res) {
//   console.log('in the post to recipes favorite route ######');
//     // add to database, adding raw to a table
//
//     var recipeTitle = req.body.title;
//     db.favorite.findOne({
//       where:{
//         title: recipeTitle
//       }
//     }).then(function(recipe){
//       //recipe is the result of my query
//       if(recipe === null){
//         db.favorite.create({
//           title: recipeTitle
//         }).then(function(recipe){
//           //here poke is what db returned from create
//           console.log('created ', recipe.title);
//           res.redirect('/favorite/show');
//         });
//       }else{
//         console.log('already added: ', recipe.title);
//         res.redirect('/recipe');
//       }
//     });
//
// });

// POST /projects - create a new project
router.post('/favorite/show', function(req, res) {
    db.recipe.create({
        title: req.body.title,
        url: req.body.href,
        ingredient: req.body.ingredients
    }).then(function(newProject) {
        var recipe = [];
        if (req.body.food) {
            recipes = req.body.food.split(",");
        }
        if (categories.length > 0) {
            async.forEachSeries(recipes, function(recipe, callback) {
                //functions that runs for each category

                // 2. insert one or many categories for this one project
                db.food.findOrCreate({
                    where: { name: food.trim() }
                }).spread(function(recipe, wasCreated) {
                    // add the info into the join table

                    // 3. populating the join table for each category for that project
                    newFavorite.addRecipe(recipe);
                    callback();
                });
            }, function() {
                //runs when everything is done
                res.redirect("/favorite/show");
            });
        } else {
            res.redirect("/recipes");
        }
    }).catch(function(error) {
        res.status(400).render('main/404');
    });
});

module.exports = router;
