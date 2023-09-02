const movieService = require('./movies.service');

const addMovie = async (req, res, next) => {
  try {
    const createdMovie = await movieService.addMovie(req.body);

    res.status(200).json({
      data: createdMovie,
      status: 1
    });
  } catch (e) {
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
   await movieService.deleteMovie(req.params.movieId);

    res.status(200).json({
      status: 1
    });
  } catch (e) {
    next(e);
  }
};

const updateMovie = async (req, res, next) => {
  try {
   const movie = await movieService.updateMovie(req.params.movieId, req.body);

    res.status(200).json({
      data: movie,
      status: 1
    });
  } catch (e) {
    next(e);
  }
};

const showMovie = async (req, res, next) => {
  try {
   const movie = await movieService.showMovieById(req.params.movieId);

    res.status(200).json({
      data: movie,
      status: 1
    });
  } catch (e) {
    next(e);
  }
};

const getMovies = async (req, res, next) => {
  try {
   const moviesData = await movieService.getMovies(req.query);

    res.status(200).json({
      data: moviesData.data,
      meta: { total: moviesData.total},
      status: 1
    });
  } catch (e) {
    next(e);
  }
};

const importMovies = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    await movieService.importMovie(file);

    res.status(200).json({
      status: 1
    });
  } catch (e) {
    next(e);
  }
};


module.exports = {
  addMovie,
  deleteMovie,
  updateMovie,
  showMovie,
  getMovies,
  importMovies
};
