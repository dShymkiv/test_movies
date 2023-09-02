const jwtService = require('../../services/jwt.service');
const userService = require('../users/users.service');
const { wrapError } = require("../wrapError");

const loginUser = wrapError(async (req, res) => {
  const user = await userService.findUserByEmail(req.body.email);

  await jwtService.checkPasswords(user.dataValues.password, req.body.password);
  const token = jwtService.generateAccessToken(user.email);

  res.json({
    token,
    status: 1
  });
});

module.exports = {
  loginUser
};
