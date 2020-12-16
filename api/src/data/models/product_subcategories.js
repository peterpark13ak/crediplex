'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_subcategories = sequelize.define('product_subcategories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},    
    product_category_id: {type: DataTypes.INTEGER, },
    name: { type: DataTypes.STRING, allowNull: false}
  }, {underscored: true});

  return product_subcategories;
};