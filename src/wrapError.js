exports.wrapError = (handler) => async (req, res, next) => {
  try {
    return await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};
