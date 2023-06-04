const bcrypt = require("bcrypt");

const getHashedPassword = (password) => bcrypt.hash(password, 10);

const comparePassword = (hashedPassword, password) =>
  bcrypt.compare(password, hashedPassword);

module.exports = { getHashedPassword, comparePassword };
