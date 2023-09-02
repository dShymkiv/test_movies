const { Sequelize } = require('sequelize');
const config = require("./config/config");

//                                 db-name        user    pass
const sequelize = new Sequelize('movieSQLiteDB', 'user', 'user', {
  dialect: 'sqlite',
  // storage: config.SQLITE_URL,
  host: './dev.sqlite'
});

module.exports = sequelize
