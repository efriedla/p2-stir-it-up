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
      res.render('favorite/addrecipe', {recipes: recipes})

    })

      .catch(function(error) {
          res.status(400).render('main/404');
          console.log("nooooo");
      });
});

// GET - return a page with favorites
router.get('/', function(req, res) {
    //get everything from all
    db.favorite.findAll({
    }).then(function(recipes){
      res.render('favorite/show', { recipes: recipes });
      //console.log(recipes)
    });
});

//deleting from favorites
// router.delete('/', function(req, res){
//   var recipeToDelete = req.params.pokemonName;
//   db.favorite.destroy({
//     where:  {
//       name: req.body.name,
//       url: req.body.url,
//       ingredient: req.body.ingredient
//       }
//   }).then(function(recipes){
//     console.log('deleted', recipeToDelete);
//     res.redirect('favorite/show');
//   });
// });
router.delete("/:name", function(req, res){
console.log("DESTROYYYYYYYYYYYYYYYYYYYYYYYY")
  db.favorite.destroy({

    where: {
      name: req.params.name
     //name: req.body.name,
      // url: req.body.url,
      //  ingredient: req.body.ingredient
       }
  }).then(function(recipes){
    console.log(recipes.ingredient);
  res.redirect("/favorite");

})
});

// //deleting from list
// router.delete('/favorites', function(req, res){
//   var toDelete = req.params.itemName;
//   console.log('I am deleting this item: ', toDelete);
//   db.favorite.destroy({
//     where: {
//       name: req.params.name,
//     }
//   });
// });

module.exports = router;
