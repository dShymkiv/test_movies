const Joi = require('joi');

const movieFormat = require('../../config/enum/movieFormat');
const { ID, TITLE, YEAR } = require('../../config/enum/sortFields');
const regExp = require('../../config/enum/regexp');
const { ASC, DESC } = require('../../config/enum/sortOrder');

const addOrUpdateMovieSchema = {
  body: Joi.object().keys({
    title: Joi.string().pattern(regExp.TITLE).trim().required().error(new Error("'title' is not valid")),
    year: Joi.number().required().error(new Error("Please enter valid year data. Year must be from 1850 to 2023")),
    format: Joi.string().valid(movieFormat.DVD, movieFormat.VHS, movieFormat.BLU_RAY).required().error(new Error("Please enter valid data")),
    actors: Joi.array().items(Joi.string()).min(1).required().error(new Error("Please enter valid data")),
  })
};

const getAllMoviesSchema = {
  query: Joi.object().keys({
    offset: Joi.number().integer().default(0),
    limit: Joi.number().integer().default(20),
    sort: Joi.string()
      .valid(ID, TITLE, YEAR)
      .default(ID)
      .error(new Error("Please enter a valid 'sort' parameter")),
    order: Joi.string()
      .valid(ASC, DESC)
      .default(ASC)
      .error(new Error("Please enter a valid 'order' parameter")),
    actor: Joi.string(),
    title: Joi.string(),
    search: Joi.string(),
  }),
};

const movieIdSchema = {
  params: Joi.object()
    .keys({
      movieId: Joi.string().alphanum().required(),
    })
    .required(),
};

module.exports = {
  addOrUpdateMovieSchema,
  getAllMoviesSchema,
  movieIdSchema,
};
