'use strict';
module.exports = (sequelize, DataTypes) => {
  var lender_addresses = sequelize.define('lender_addresses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    street: { type: DataTypes.STRING, allowNull: false},   
    street_number: { type: DataTypes.STRING, allowNull: false},   
    suite: {type: DataTypes.INTEGER, allowNull:true},
    cross_street_a: { type: DataTypes.STRING, allowNull: true},   
    cross_street_b: { type: DataTypes.STRING, allowNull: true},   
    landmark: { type: DataTypes.STRING, allowNull: true},   
    zipcode: { type: DataTypes.STRING, allowNull: true},   
    municipio: { type: DataTypes.STRING, allowNull: true},   
    federal_entity: { type: DataTypes.STRING, allowNull: true},   
    colonia: { type: DataTypes.STRING, allowNull: true},   
    area_code: { type: DataTypes.STRING, allowNull: true},   
    phone_number: { type: DataTypes.STRING, allowNull: true},   

  }, {underscored: true});

  lender_addresses.associate = function(models) {
    // associations can be defined here
    lender_addresses.belongsTo(models.lenders,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })    
    
  };
  return lender_addresses;
};
