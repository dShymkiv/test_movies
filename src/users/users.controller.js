const userService = require('./users.service');
const jwtService = require('../../services/jwt.service');

const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    const token = jwtService.generateAccessToken(newUser.email);

    res.status(200).json({
      token,
      status: 1
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
};
