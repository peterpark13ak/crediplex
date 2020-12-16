'use strict';
module.exports = (sequelize, DataTypes) => {
  var trade_associations = sequelize.define('trade_associations', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: { type: DataTypes.STRING, allowNull: false},
  }, {underscored: true});

  trade_associations.associate = function(models) {
    // associations can be defined here
    trade_associations.hasMany(models.lenders)
    
  };

  return trade_associations;
};
