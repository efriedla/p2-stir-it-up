'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorite = sequelize.define('favorite', {
    name: DataTypes.STRING,
    ingredient: DataTypes.TEXT,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.belongsToMany(models.user, {through: "userfav"})
      }
    }
  });
  return favorite;
};
