'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lender_id: {
          type: Sequelize.INTEGER, 
          allowNull: false,
        },
      address: { 
          type: Sequelize.STRING, 
          allowNull: false
        },
      city: { 
          type: Sequelize.STRING, 
          allowNull: false
        },
      state: { 
          type: Sequelize.STRING, 
          allowNull: false
        },
      phone_number: { 
          type: Sequelize.STRING, 
          allowNull: false
        },
      is_default: {
          type:Sequelize.BOOLEAN, 
          allowNull:false
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
    return queryInterface.dropTable('branches');
  }
};