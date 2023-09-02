const Joi = require('joi');

const regExp = require('../../config/enum/regexp');

const loginUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().regex(regExp.EMAIL).lowercase().trim().required().error(new Error("'email' is not valid")),
    password: Joi.string().regex(regExp.PASSWORD).required().error(new Error("Please enter valid data")),
  })
};

const headersSchema = {
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(256).error(new Error("Invalid token")),
  }).unknown(),
};

module.exports = {
  loginUserSchema,
  headersSchema
};
