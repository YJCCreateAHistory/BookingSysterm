'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'authority',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        uid: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        one_authority: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        two_authority: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        three_authority: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        normal: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        create_time: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        update_time: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('authority');
  },
};
