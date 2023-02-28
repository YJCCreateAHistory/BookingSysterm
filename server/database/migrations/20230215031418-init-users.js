'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
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
        name: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        telephone: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        psd: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        role: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        avatar: {
          allowNull: true,
          type: Sequelize.STRING(255),
        },
        facultis: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        class: {
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
        create_time: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        last_login: {
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

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
