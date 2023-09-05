const { Unauthorized, BadRequest } = require('../../errors/ApiError');
const { findUserByEmail } = require("./users.service");
const { wrapError } = require("../wrapError");

const checkUserPasswordMdlwr = wrapError(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    throw new Unauthorized("Confirm password doesn't match password");
  }

  next();
});

const checkUserUniqueMdlwr = wrapError(async (req, res, next) => {
  const user = findUserByEmail(req.body.email);

  if (!user) {
    throw new BadRequest("User with requested email was not found");
  }

  if (req.body.email === user.email) {
    throw new BadRequest("User with current email already exists");
  }

  next();
});

module.exports = {
  checkUserPasswordMdlwr,
  checkUserUniqueMdlwr
};
