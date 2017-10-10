var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');


router.post("/", isLoggedIn, function(req, res) {
  console.log(req.user.id + "00000000000000000000000");
  console.log(req.body.name);
  console.log(req.body.ingredient)
    db.user.findOne({
        where: {
            id: req.user.id
        },
    }).then(function(user) {
      user.createFavorite({
        name: req.body.name,
        url: req.body.url,
        ingredient: req.body.ingredient,
        userId: req.body.userId
      })
      .then(function(recipes){
                //var arr = [];

                  console.log(recipes.ingredient);
              res.render('favorite/addrecipe', {recipes: recipes})

            })
  //     db.favorite.findOrCreate({
  //       where:  {
  //         name: req.body.name,
  //         url: req.body.url,
  //         ingredient: req.body.ingredient
  //         }
  //       }).spread(function(recipes){
  //           //var arr = [];
  //
  //             console.log(recipes.ingredient);
  //         res.render('favorite/addrecipe', {recipes: recipes})
  //
  //       })
  //
          .catch(function(error) {
              res.status(400).render('main/404');
              console.log("nooooo");
          });
  //  });
	});
});





// GET - return a page with favorites
//
// router.get('/', isLoggedIn, function(req, res) {
//     //get everything from all
//     db.favorite.find({
//       where: {
//         id: req.user.id
//       }
//     })
//     .then(function(user){
//   		user.getFavorites().
//     then(function(recipes){
//       res.render('favorite/show', { recipes: recipes });
//       //console.log(recipes)
//     });
//   });
// });
//
router.get('/', isLoggedIn, function(req, res) {
    //get everything from all
    db.favorite.findAll({
    }).then(function(recipes){
      res.render('favorite/show', { recipes: recipes });
      //console.log(recipes)
    });
});

router.get('/profile', function(req, res) {
    //get everything from all
    console.log("profileeeeeeeeee")
    db.user.find({
      where: { email: req.body.email },
    }).then(function(users){
      res.render('profile', { users: user });
      console.log(users)
    });
});

//deletes from favorites
router.delete("/:name", function(req, res){
console.log("DESTROYYYYYYYYYYYYYYYYYYYYYYYY")
  db.favorite.destroy({

    where: {
      name: req.params.name
       //url: req.params.url
      //  ingredient: req.body.ingredient
       }
  }).then(function(recipes){
    //console.log(recipes.ingredient);
  res.redirect("/favorite");

})
});



module.exports = router;
