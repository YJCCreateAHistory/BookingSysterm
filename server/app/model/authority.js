'use strict';
module.exports = app => {
  const Sql = app.Sequelize;
  const user = app.model.define('authority', {
    id: { allowNull: false, autoIncrement: true, type: Sql.INTEGER, primaryKey: true },
    uid: Sql.STRING(255),
    one_authority: Sql.TEXT,
    two_authority: Sql.TEXT,
    three_authority: Sql.TEXT,
    normal: Sql.STRING(255),
    create_time: Sql.DATE,
    update_time: Sql.DATE,
  });
  return user;
};
