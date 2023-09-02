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

// class MoviesActors extends Model {}
//
// MoviesActors.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
// }, {
//   sequelize,
//   modelName: 'movies_actors'
// });
//
// Movie.belongsToMany(Actor, { through: 'MoviesActors' });
// Actor.belongsToMany(Movie, { through: 'MoviesActors' });

module.exports = MoviesActors;
