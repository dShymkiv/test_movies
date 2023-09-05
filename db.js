const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movieSQLiteDB', 'user', 'user', {
  dialect: 'sqlite',
  host: './dev.sqlite',

});

module.exports = sequelize
