const movieRouter = require('express').Router();
const multer = require('multer');

const movieController = require('./movies.controllers');
const authMdlwr = require('../auth/auth.middleware');
const { validate } = require('../mainValidator');
const schema = require('./movies.schema');
const authSchema = require('../auth/auth.schema');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

movieRouter.use('/',
  validate(authSchema.headersSchema),
  authMdlwr.validateAccessToken
);
movieRouter.post('/',
  validate(schema.addOrUpdateMovieSchema),
  movieController.addMovie
);
movieRouter.get('/',
  validate(schema.getAllMoviesSchema),
  movieController.getMovies
);

movieRouter.post('/import',
  upload.single('file'),
  // validate(schema.createUserSchema),
  authMdlwr.validateAccessToken,
  movieController.importMovies
);

movieRouter.use('/:movieId',
  validate(schema.movieIdSchema),
  authMdlwr.validateAccessToken
);
movieRouter.delete('/:movieId',
  movieController.deleteMovie
);
movieRouter.patch('/:movieId',
  validate(schema.addOrUpdateMovieSchema),
  movieController.updateMovie
);
movieRouter.get('/:movieId',
  movieController.showMovie
);

module.exports = movieRouter;
