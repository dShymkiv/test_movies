const Movie = require('../../db/Movie');
const Actor = require('../../db/Actor');
const MoviesActors = require('../../db/MoviesActors');
const { NotFound } = require('../../errors/ApiError');
const { buildFilterQuery, buildSortQuery } = require('./movies.utils');

const findMovieByParam = (param, value) => {
  return Movie.findOne({
    where: { [param]: [value] },
    include: {
      model: Actor,
      attributes: ['id', 'name'],
      through: { attributes: [] }
    },
    attributes: ['id', 'title', 'year', 'format']
  });
};

const addMovie = async (movie) => {
  const newMovie = await Movie.create({
    ...movie,
  });

  for (const actorName of movie.actors) {
    const [actor] = await Actor.findOrCreate({
      where: { name: actorName },
    });
    await newMovie.addActor(actor);
  }

  const result = await findMovieByParam('id', newMovie.id);

  return {...result.dataValues};
};

const deleteMovie = async (movieId) => {
  await MoviesActors.destroy({
    where: { movie_id: movieId }
  });
  await Movie.destroy({
    where: { id: movieId }
  });
};

const updateMovie = async (movieId, fieldsToChange) => {
  const movie = await findMovieByParam('id', movieId);

  if (!movie) {
    throw new NotFound('Movie not found');
  }

  movie.title = fieldsToChange.title || movie.title;
  movie.year = fieldsToChange.year || movie.year;
  movie.format = fieldsToChange.format || movie.format;

  await movie.save();

  await MoviesActors.destroy({
    where: { movie_id: movieId }
  });

  for (const actorName of fieldsToChange.actors) {
    const [actor] = await Actor.findOrCreate({
      where: { name: actorName },
    });
    await movie.addActor(actor);
  }

  const result = await findMovieByParam('id', movieId);

  return {
    ...result.dataValues,
  };
};

const showMovieById = async (movieId) => {
  const movie = await findMovieByParam('id', movieId);

  return {
    ...movie.dataValues,
  };
};

const properties = {
  'Title': 'title',
  'Release Year': 'year',
  'Format': 'format',
  'Stars': 'actors'
};

const parseDataFromFile = async (file) => {
  const content = file.buffer.toString();
  const moviesData = content
    .split('\n\n')
    .filter(d => d);

  const moviesToAdd = [];

  for (const movieText of moviesData) {
    const movieInfo = {};
    const lines = movieText.split('\n');

    for (const line of lines) {
      const [key, value] = line.split(': ');
      movieInfo[properties[key]] = value;
    }

    const actors = movieInfo['actors'].split(', ');

    moviesToAdd.push({...movieInfo, actors});
  }

    return moviesToAdd;
};

const importMovie = async (file) => {
  const moviesToAdd = await parseDataFromFile(file);
  const addedMovies = [];

  for (const movie of moviesToAdd) {
    const uniqueMovie = await findMovieByParam('title', movie.title);

    if (uniqueMovie) {
      continue;
    }

    const importedMovie = await addMovie(movie);
    addedMovies.push({
      id: importedMovie.id, title: importedMovie.title, year: importedMovie.year, format: importedMovie.format
    });
  }

  const { count: totalInSystem  } = await Movie.findAndCountAll();

  return {
    data: addedMovies,
    meta: {
      imported: addedMovies.length,
      total: totalInSystem
    }
  };
};

const getMovies = async (query = {}) => {
  const { offset, limit, sort, order, actor, title, search } = query;

  const baseQuery = {
    attributes: ['id', 'title', 'year', 'format', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Actor,
        attributes: [],
        where: {},
        through: {
          attributes: [],
        },
      },
    ],
    group: 'Movie.id',
  };

  const enrichedWithFiltersQuery = await buildFilterQuery({
    baseQuery,
    actor,
    title,
    search
  });

  enrichedWithFiltersQuery.order = await buildSortQuery(sort, order);
  enrichedWithFiltersQuery.limit = limit;
  enrichedWithFiltersQuery.offset = offset;

  const searchedItems = await Movie.findAndCountAll(enrichedWithFiltersQuery);

  return { data: searchedItems.rows, total: searchedItems.count[0].count };
};

module.exports = {
  addMovie,
  deleteMovie,
  updateMovie,
  showMovieById,
  getMovies,
  importMovie,
  findMovieByParam
};
