// const userService = require('./users.service');
// const { NotFound } = require('../../errors/ApiError');
//
// const getUserByEmailMdlwr = (email) => async (req, res, next) => {
//   try {
//     const user = await userService.findUserByEmail(email);
//
//     if (!user) {
//       throw new NotFound('User not found');
//     }
//
//     req.locals = { ...req.locals, user };
//
//     next();
//   } catch (e) {
//     next(e);
//   }
// };
//
// module.exports = {
//   getUserByEmailMdlwr
// };
