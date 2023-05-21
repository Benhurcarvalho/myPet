'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clinic_pet', {
      clinicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clinics',
          key: 'id'
        },
        allowNull: false,
        field: 'clinic_id'
      },
      petId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pets',
          key: 'id'
        },
        allowNull: false,
        field: 'pet_id'
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clinic_pet');
  }
};
