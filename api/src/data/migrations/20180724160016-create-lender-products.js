'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lender_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lender_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_category_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_subcategory_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_status_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_adhesion_contract:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_contracto_multiple:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },      
      RECA: {
        type: Sequelize.STRING,
        allowNull: false
      },
      max_annual_interest: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dispersal_methods: {
        type: Sequelize.STRING,
        allowNull: true
      },
      term: {
        type: Sequelize.STRING,
        allowNull: true
      },
      min_amount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      pay_period: {
        type: Sequelize.STRING,
        allowNull: true
      },
      coverage_area: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      payment_plan_type: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      interest_type: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      credit_use: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }   
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lender_products');
  }
};