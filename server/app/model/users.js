'use strict';
module.exports = app => {
  const Sql = app.Sequelize;
  const user = app.model.define('users', {
    id: { allowNull: false, autoIncrement: true, type: Sql.INTEGER, primaryKey: true },
    uid: Sql.STRING(255),
    name: Sql.STRING(255),
    telephone: Sql.STRING(255),
    psd: Sql.STRING(255),
    role: Sql.STRING(255),
    avatar: Sql.STRING(255),
    faculties: Sql.STRING(255),
    class: Sql.STRING(255),
    one_authority: Sql.TEXT,
    two_authority: Sql.TEXT,
    three_authority: Sql.TEXT,
    create_time: Sql.DATE,
    last_login: Sql.DATE,
    update_time: Sql.DATE,
  },
  {
    paranoid: true,
    defaultScopes: {
      attributes: { exclude: [ 'psd' ] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  });
  return user;
};
