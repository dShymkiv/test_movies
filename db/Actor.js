const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const Actor = sequelize.define('actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// class Actor extends Model {}
//
// Actor.init({
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
// }, {
//   sequelize,
//   modelName: 'actor'
// });

module.exports = Actor;
