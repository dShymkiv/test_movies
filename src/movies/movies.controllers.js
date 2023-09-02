const movieService = require('./movies.service');
const { NotFound } = require('../../errors/ApiError');
const { CREATED, NOT_FOUND } = require('../../errors/error.codes');
const { wrapError } = require('../wrapError');

const addMovie = wrapError(async (req, res) => {
  const createdMovie = await movieService.addMovie(req.body);

  res.status(CREATED).json({
    data: createdMovie,
    status: 1
  });
});

const deleteMovie = wrapError(async (req, res) => {
  await movieService.deleteMovie(req.params.movieId);

  res.status(200).json({
    status: 1
  });
});

const updateMovie = wrapError(async (req, res) => {
  const movie = await movieService.updateMovie(req.params.movieId, req.body);

  res.status(200).json({
    data: movie,
    status: 1
  });
});

const showMovie = wrapError(async (req, res) => {
  const movie = await movieService.showMovieById(req.params.movieId);

  if (!movie) {
    throw new NotFound('Requested movie was not found');
  }

  res.status(200).json({
    data: movie,
    status: 1
  });
});

const getMovies = wrapError(async (req, res) => {
  const moviesData = await movieService.getMovies(req.query);

  res.status(200).json({
    data: moviesData.data,
    meta: {total: moviesData.total},
    status: 1
  });
});

const importMovies = wrapError(async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(NOT_FOUND).json({message: 'No file uploaded'});
  }

  const data = await movieService.importMovie(file);

  res.status(200).json({
    ...data,
    status: 1
  });
});


module.exports = {
  addMovie,
  deleteMovie,
  updateMovie,
  showMovie,
  getMovies,
  importMovies
};
