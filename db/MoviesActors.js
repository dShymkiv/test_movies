const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const MoviesActors = sequelize.define('movies_actors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = MoviesActors;
