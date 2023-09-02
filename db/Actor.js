const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const Actor = sequelize.define('actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Actor;
