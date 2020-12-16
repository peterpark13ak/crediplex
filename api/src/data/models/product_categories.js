'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_categories = sequelize.define('product_categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    external_id: {type: DataTypes.INTEGER, },
    name: { type: DataTypes.STRING, allowNull: false}
  }, {underscored: true});

  return product_categories;
};