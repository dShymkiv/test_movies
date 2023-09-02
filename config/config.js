const {enable} = require("express/lib/application");
module.exports = {
  PORT: process.env.PORT || 5001,
  SQLITE_URL: process.env.SQLITE_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
