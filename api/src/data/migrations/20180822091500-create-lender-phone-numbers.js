'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lender_phone_numbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lender_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address_id:{
        type: Sequelize.INTEGER,
        allowNull: true
      },   
      product_id:{
        type: Sequelize.INTEGER,
        allowNull: true
      },                  
      area_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('lender_phone_numbers');
  }
};