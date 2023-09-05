const sequelize = require('../../db');

const buildFilterQuery = async (query = {}) => {
  //todo: add search
  if(query.actor) {
    query.baseQuery.include[0].where = { name : query.actor }
  }

  if (query.title) {
    query.baseQuery.where = {
      title: query.title
    };
  }

  return query.baseQuery;
};

const buildSortQuery = async (sort, order) => {
  return [sequelize.literal(`LOWER("Movies.${sort}") ${order}`)];
};

module.exports = {
  buildFilterQuery,
  buildSortQuery
};
