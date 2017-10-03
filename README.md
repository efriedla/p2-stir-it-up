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
