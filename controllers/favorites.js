var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');

// router.get('/recipes', function(req, res) {
//     //get everything from pockemon db and render favotites page.
//     db.favorite.findAll({
//     }).then(function(recipes){
//       res.render('favorite/show', { recipes: recipes });
//     });
// });

// router.post('/favorite/recipes', function(req, res) {
//   var query = req.body.q;
//   var recipepuppyUrl = "http://www.recipepuppy.com/api/?";
//   recipepuppyUrl = recipepuppyUrl + "q=" + query;
//   console.log(recipepuppyUrl);
//   request(recipepuppyUrl, function(error, response, body){
//     var recipes = JSON.parse(body).results;
//     res.render('recipes', {recipes: recipes});
//
//   });
// //  will post to database
//   db.favorite.findAll().then(function(fav){});
// //find or create
// db.favorite.findOrCreate({
//   where: {name: 'Ginger Champagne',
//         },
//         defaults: {url: 'http://allrecipes.com/Recipe/Ginger-Champagne/Detail.aspx'}
// }).spread(function(fav, created) {
//   console.log(fav);
// });
// });

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

// db.post('/recipes', function(req, res) {
//
//     var name = req.body.name;
//     var url= req.body.url;
//     User.addFavorite(name, url, function(err, user) {
//         if (err) throw err;
//         res.redirect('/');
//     });
// });
// POST /projects - create a new project
router.post('/', function(req, res) {
    console.log('in the favorites show post route #######');

    db.favorite.findOrCreate({

  where:  {name: req.body.name,
    url: req.body.url,
    ingredient: req.body.ingredient}
    }).spread(function(newFavorite) {
        var recipe = [];
        if (req.body.food) {
            recipes = req.body.food.split(",");
        }
        if (favories.length > 0) {
            async.forEachSeries(recipes, function(recipe, callback) {
                //functions that runs for each recipe

                // 2. insert one or many categories for this one project
                db.food.findOrCreate({
                    where: { title: food.trim() }
                }).spread(function(recipe, wasCreated) {
                    // add the info into the join table

                    // 3. populating the join table for each category for that project
                    newFavorite.addRecipe(recipe);
                    callback();
                });
            }, function() {
                //runs when everything is done
                res.redirect("/");
            });
        } else {
            res.redirect("/");
        }
    }).catch(function(error) {
        res.status(400).render('main/404');
        console.log("nooooo");
    });
});
router.get('/', function(req, res){
  res.send("yayay")
})

module.exports = router;
