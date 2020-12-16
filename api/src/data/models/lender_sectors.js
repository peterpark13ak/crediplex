'use strict';
module.exports = (sequelize, DataTypes) => {
  var lender_sectors = sequelize.define('lender_sectors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: { type: DataTypes.STRING, allowNull: false},
  }, {underscored: true});

  lender_sectors.associate = function(models) {
    // associations can be defined here
    lender_sectors.hasMany(models.lenders,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
    
  };

  return lender_sectors;
};
