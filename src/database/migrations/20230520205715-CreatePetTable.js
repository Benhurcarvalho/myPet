'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false        
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false      
      },
      breed: {
        type: Sequelize.STRING,
        allowNull: false    
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false  
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        field: 'user_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pets');
  }
};
