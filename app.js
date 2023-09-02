const express = require('express');

require('dotenv').config();

const router = require('./src/api.router');
const config = require('./config/config');
const { NotFound } = require('./errors/ApiError');
const Actor = require('./db/Actor');
const Movie = require('./db/Movie');
const User = require('./db/Movie');
const MoviesActors = require('./db/MoviesActors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);
app.use('*', _notFoundError);
app.use(mainErrorHandler);

const defineRelations = () => {
  const common = options => ({
    ...options,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Movie.belongsToMany(Actor, common({
    through: 'movies_actors',
    foreignKey: 'movie_id',
    otherKey: 'actor_id'
    })
  );
  Actor.belongsToMany(Movie, common({
    through: 'movies_actors',
    foreignKey: 'actor_id',
    otherKey: 'movie_id'
    })
  );

  MoviesActors.belongsTo(Movie, { foreignKey: 'movie_id'});
  MoviesActors.belongsTo(Actor, { foreignKey: 'actor_id'});
  Movie.hasMany(MoviesActors, common(
    { foreignKey: 'movie_id'}
  ));
  Actor.hasMany(MoviesActors, common(
    { foreignKey: 'actor_id'}
  ));
}

app.listen(config.PORT, async () => {
  try {
    defineRelations();
    await Actor.sync({force: true});
    await Movie.sync({force: true});
    await MoviesActors.sync({force: true});
    await User.sync({force: false});

  } catch (err) {
    if (err) console.log(err);

    process.exit(1);
  }
  console.log(`PORT: ${ config.PORT }`);
});

function _notFoundError(req, res, next) {
  next(new NotFound('Route not found'));
}

function mainErrorHandler(err, req, res, _) {
  console.log(err);
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error'
    });
}
