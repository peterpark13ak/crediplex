'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lender_addresses', {
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
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      street_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      suite: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cross_street_a: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cross_street_b: {
        type: Sequelize.STRING,
        allowNull: true
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false
      },      

      municipio: {
        type: Sequelize.STRING,
        allowNull: false
      },      
      federal_entity: {
        type: Sequelize.STRING,
        allowNull: false
      },      
      colonia: {
        type: Sequelize.STRING,
        allowNull: false
      },      
      area_code: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('lender_addresses');
  }
};