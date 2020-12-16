'use strict';
module.exports = (sequelize, DataTypes) => {
  var lender_phone_numbers = sequelize.define('lender_phone_numbers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    lender_id: {type: DataTypes.INTEGER, allowNull: false },
    address_id: {type: DataTypes.INTEGER, allowNull: true},
    product_id: {type: DataTypes.INTEGER, allowNull: true},
    area_code: { type: DataTypes.STRING, allowNull: false},   
    phone_number: {type: DataTypes.INTEGER, allowNull:false},    
    
  }, {underscored: true});

  lender_phone_numbers.associate = function(models) {
    // associations can be defined here
    lender_phone_numbers.belongsTo(models.lenders,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })    
    
  };
  return lender_phone_numbers;
};
