const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const Movie = sequelize.define('movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  year: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  format: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// class Movie extends Model {}
//
// Movie.init({
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   year: {
//     type: DataTypes.NUMBER,
//     allowNull: false,
//   },
//   format: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'movie'
// });

module.exports = Movie;
