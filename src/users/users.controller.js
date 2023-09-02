const userService = require('./users.service');
const jwtService = require('../../services/jwt.service');
const { wrapError } = require('../wrapError');

const createUser = wrapError(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  const token = jwtService.generateAccessToken(newUser.email);

  res.status(200).json({
    token,
    status: 1
  });
});

module.exports = {
  createUser,
};
