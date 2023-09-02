const authRouter = require('express').Router();

const authController = require('./auth.controller');
const { validate } = require('../mainValidator');
const schema = require('./auth.schema');

authRouter.post('/',
  validate(schema.loginUserSchema),
  authController.loginUser
);

module.exports = authRouter;
