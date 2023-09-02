const userRouter = require('express').Router();

const userController = require('./users.controller');
const schema = require('./users.schema');
const { validate } = require('../mainValidator');

userRouter.post('/',
  validate(schema.createUserSchema),
  // mdlwr.checkIsUserExistsDynamically('email', 'body'),
  userController.createUser,
);

module.exports = userRouter;
