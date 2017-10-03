'use strict';
module.exports = (sequelize, DataTypes) => {
  var userFav = sequelize.define('userFav', {
    userId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userFav;
};
