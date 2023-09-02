const { Unauthorized } = require('../../errors/ApiError');

const checkUserPasswordMdlwr = async (req, res, next) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new Unauthorized("Confirm password doesn't match password");
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkUserPasswordMdlwr
};
