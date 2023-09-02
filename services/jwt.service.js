const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { BadRequest, Unauthorized } = require('../errors/ApiError');
const config = require('../config/config');

const hashPassword = (password) => bcrypt.hash(password, 10);

const checkPasswords = async (hashedPassword, password) => {
  const isPasswordsEquals = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordsEquals) {
    throw new BadRequest('Email or password is wrong');
  }
};

const generateAccessToken = (encodeData = {}) => {
  const accessToken = jwt.sign({ encodeData }, config.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

  return accessToken;
};

const validateToken = (token = '') => {
  try {

    return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  } catch (e) {
    throw new Unauthorized(e.message || 'Invalid token');
    // for not valid token throw only 401 Error -> UNAUTHORIZED
  }
};

module.exports = {
  hashPassword,
  checkPasswords,
  generateAccessToken,
  validateToken,
};
