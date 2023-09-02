const { Op } = require('sequelize');

const Movie = require('../../db/Movie');
const Actor = require('../../db/Actor');
const MoviesActors = require('../../db/MoviesActors');
const { TITLE, ACTOR } = require("../../config/enum/filterFields");

const buildFilterQuery = async (query = {}) => {
  //todo: add search
  if(query.actor) {
    query.baseQuery.include[0].where = { name : query.actor}
  }

  if (query.title) {
    query.baseQuery.where = {
      title: query.title
    };
  }

  return query.baseQuery;
};

const buildSortQuery = async (sort, order) => {

  return [[sort, order]];
};

module.exports = {
  buildFilterQuery,
  buildSortQuery
};
