const jwtService = require('../../services/jwt.service');
const userService = require('../users/users.service');

const loginUser = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);

    await jwtService.checkPasswords(user.dataValues.password, req.body.password);
    const token = jwtService.generateAccessToken(user.email);

    res.json({
      token,
      status: 1,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginUser,
};
