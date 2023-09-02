module.exports = {
  EMAIL: /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
  PASSWORD: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#^])[0-9A-Za-z#@$!%*?&]{8,}/,
};