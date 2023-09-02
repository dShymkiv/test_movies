const router = require('express').Router();

const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const movieRouter = require('./movies/movies.router');

router.use('/users', userRouter);
router.use('/sessions', authRouter);
router.use('/movies', movieRouter);

module.exports = router;
