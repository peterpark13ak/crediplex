'use strict';
module.exports = (sequelize, DataTypes) => {
  var products = sequelize.define('lender_products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    lender_id: {type: DataTypes.INTEGER, allowNull: false },
    product_category_id: {type: DataTypes.INTEGER, allowNull: false },
    product_subcategory_id: {type: DataTypes.INTEGER, allowNull: true },
    product_status_id: {type: DataTypes.INTEGER, allowNull: true },
    is_adhesion_contract:{ type: DataTypes.BOOLEAN,allowNull: false},
    is_contracto_multiple:{ type: DataTypes.BOOLEAN,allowNull: false},
    RECA: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    max_annual_interest: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false},    
    dispersal_methods: { type: DataTypes.STRING, allowNull: true },
    term: { type: DataTypes.STRING, allowNull: true },
    min_amount: { type: DataTypes.DECIMAL, allowNull: true },
    pay_period: { type: DataTypes.STRING, allowNull: true },
    coverage_area: { type: DataTypes.STRING, allowNull: true },
    payment_plan_type: { type: DataTypes.STRING, allowNull: true },
    interest_type: { type: DataTypes.STRING, allowNull: true },
    credit_use: { type: DataTypes.STRING, allowNull: true },
    // description: { type: DataTypes.STRING, allowNull: false}
  }, {underscored: true});

  return products;
};



