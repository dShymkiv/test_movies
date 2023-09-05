const userRouter = require('express').Router();

const userController = require('./users.controller');
const userMdlwr = require('./users.middleware');
const schema = require('./users.schema');
const { validate } = require('../mainValidator');

userRouter.post('/',
  validate(schema.createUserSchema),
  userMdlwr.checkUserUniqueMdlwr,
  userMdlwr.checkUserPasswordMdlwr,
  userController.createUser,
);

module.exports = userRouter;
