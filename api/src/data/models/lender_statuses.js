'use strict';
module.exports = (sequelize, DataTypes) => {
  var lender_statuses = sequelize.define('lender_statuses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: { type: DataTypes.STRING, allowNull: false},
  }, {underscored: true});

  lender_statuses.associate = function(models) {
    // associations can be defined here
    lender_statuses.hasMany(models.lenders,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
    
  };

  return lender_statuses;
};
