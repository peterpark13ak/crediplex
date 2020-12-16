'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lenders', {
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
      legal_name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      external_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lender_activity_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      trade_association_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lender_status_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lender_sector_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      supervisor:{
        type: Sequelize.STRING, 
        allowNull: false
      },
      rfc:{
        type: Sequelize.STRING, 
        allowNull: false
      },
      shcp_key:{
        type: Sequelize.STRING, 
        allowNull: false
      },
      slug: { 
        type: Sequelize.STRING, 
        allowNull: false
      },   
      about:{
        type:Sequelize.TEXT
      },
      overview:{
        type:Sequelize.TEXT
      },
      legal_name: { 
        type: Sequelize.STRING, 
        allowNull: false
      },
      website: { 
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
    return queryInterface.dropTable('lenders');
  }
};