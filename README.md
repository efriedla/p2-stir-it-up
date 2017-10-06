# Stir it up

Express authentication app using an api + Passport + flash messages + custom middleware

## Getting Started

### USER STORY
  * new to cooking and want to start making more meals at home
  * I have these ingredients what can I make

#### Day one

* Create Wire Frames
  * start adding in the functionality
  * api that will be used http://www.recipepuppy.com/about/api/
  * Optional Parameters:
      i : comma delimited ingredients
      q : normal search query
      p : page

#### Day two

* started working with api
  * start process of adding api data to recipes to pull title and ingredients
  * app.get('/data', function(req, res) {
    * request('http://www.recipepuppy.com/api/', function  (error, response, body) {
      * if (!error && response.statusCode == 200) {
      *  var data = JSON.parse(body);
    *   res.send(data.results[0]);

###### figuring out backend database and tables
* createdb recipeSIP

* sequelize model:create --name user --attributes name:string,email:text,password:text

* sequelize model:create --name favorite --attributes name:string,ingredient:text,url:string

* sequelize model:create --name userFav --attributes userId:integer,favoriteId:integer


* sequelize db:migrate

* “””””Note to find exact recipe, will have to find by match url””””

#### Day three

* started working on favorites
  * re-thought out routes to display favorites
  * worked on add to fav button "had a bug there where it kept wanting to get not post"
  * next step is to post to favorites table
  * then show on favorites page as user's favorites

#### Day Four

  * adding to the database
  * problem, the favorites being saved aren't assigned to a direct person
  * going to leave that alone for now and work on showing all recipes in favs on favorite/showing
  * once there I will add the ability to edit page
  * from there I will make sure that each user has a private favorites

###### later that Day

  * changed findOrCreate from favorite/show to favorite/addrecipe so that /show will show all recipes
  * added details
  * added function to delete but does not delete .... yet
  * must change the favorite and user model from m:m to m:1 because one user can have many favorites not all combined into one.
  * I will have to update my favorite model to include a userId
  * or have the favorite model be most popular and create a new model that will be the users private favorites
