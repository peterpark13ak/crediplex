'use strict';
module.exports = (sequelize, DataTypes) => {
  var lenders = sequelize.define('lenders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    external_id: {type: DataTypes.INTEGER, unique: true },
    name: { type: DataTypes.STRING, allowNull: false},   
    legal_name: { type: DataTypes.STRING, allowNull: false},   
    lender_activity_id: {type: DataTypes.INTEGER, allowNull:false},
    slug: { type: DataTypes.STRING, allowNull: false},   
    about:{type:DataTypes.TEXT},
    overview:{type:DataTypes.TEXT},
    website: { type: DataTypes.STRING, allowNull: false},
    supervisor: { type: DataTypes.STRING, allowNull: false},
    rfc: { type: DataTypes.STRING, allowNull: false},
    shcp_key: { type: DataTypes.STRING, allowNull: false},
  }, {underscored: true});

  lenders.associate = function(models) {
    // associations can be defined here
    // lenders.belongsToMany(models.products, {through:'lender_products', as: 'product'})
    lenders.belongsTo(models.lender_activities,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })    
    lenders.belongsTo(models.trade_associations,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })    
    lenders.belongsTo(models.lender_statuses,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })    /* */
    lenders.belongsTo(models.lender_sectors,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })    /* */
  };
  return lenders;
};
