'use strict';
module.exports = (sequelize, DataTypes) => {
  var branches = sequelize.define('branches', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    lender_id: {type: DataTypes.INTEGER },
    address: { type: DataTypes.STRING, allowNull: false},
    city: { type: DataTypes.STRING, allowNull: false},
    state: { type: DataTypes.STRING, allowNull: false},
    phone_number: { type: DataTypes.STRING, allowNull: false},
    is_default: {type:DataTypes.BOOLEAN, allowNull:false}
  }, {underscored: true});

  branches.associate = function(models) {
    // associations can be defined here
     branches.belongsTo(models.lenders)
  };
  return branches;
};
