const config = require('../../config/constants');
const { Unauthorized } = require('../../errors/ApiError');
const jwtService = require('../../services/jwt.service');
const userService = require('../users/users.service');
const { wrapError } = require('../wrapError');

const validateAccessToken = wrapError(async (req, res, next) => {
  const accessToken = req.get(config.AUTHORIZATION);

  if (!accessToken) {
    throw new Unauthorized('No token');
  }

  const decodedJwt = jwtService.validateToken(accessToken);
  const user = await userService.findUserByEmail(decodedJwt.encodeData);

  req.user = user.dataValues;
  next();
});

module.exports = {
  validateAccessToken
};
