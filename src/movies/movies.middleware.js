const { wrapError } = require('../wrapError');
const { BadRequest } = require('../../errors/ApiError');
const movieService = require('./movies.service');

const checkUniqueTitleMdlwr = wrapError(async (req, res, next) => {
  const movie = await movieService.findMovieByParam('title', req.body.title);

  if (movie) {
    throw new BadRequest("Current movie title already exists");
  }

  next();
});

const checkMovieYearMdlwr = wrapError(async (req, res, next) => {
  const currentYear = new Date().getFullYear();

  if (req.body.year > currentYear || req.body.year < 1850) {
    throw new BadRequest(`Year must be from 1850 to ${currentYear}`);
  }

  next();
});


module.exports = {
  checkUniqueTitleMdlwr,
  checkMovieYearMdlwr
};
