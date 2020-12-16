'use strict';
module.exports = (sequelize, DataTypes) => {
  var lender_activities = sequelize.define('lender_activities', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: { type: DataTypes.STRING, allowNull: false},
  }, {underscored: true});

  lender_activities.associate = function(models) {
    // associations can be defined here
    lender_activities.hasMany(models.lenders,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
    
  };

  return lender_activities;
};
