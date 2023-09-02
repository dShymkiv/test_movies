const Joi = require('joi');

const regExp = require('../../config/enum/regexp');

const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'firstName' is not valid")),
    email: Joi.string().regex(regExp.EMAIL).lowercase().trim().required().error(new Error("'email' is not valid")),
    password: Joi.string().regex(regExp.PASSWORD).required().error(new Error("Please enter valid data")),
    confirmPassword: Joi.string().regex(regExp.PASSWORD).required().error(new Error("Please enter valid data")),
  })
};

module.exports = {
  createUserSchema
};
