const User = require("../../db/User");
const jwtService = require('../../services/jwt.service');

const createUser = async (user) => {
  const hashPassword = await jwtService.hashPassword(user.password);

  return User.create({...user, password: hashPassword});
};

const findUserByEmail = async (email) => {
  return User.findOne({
    where: { email },
  });
};

module.exports = {
  createUser,
  findUserByEmail
};
