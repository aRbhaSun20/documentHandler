const { sign, verify } = require("jsonwebtoken");
const { errorlog } = require("./loggers");
require("dotenv").config();

const returnSignedToken = async (data) => {
  return await sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
};

const returnParsedToken = async (data) => {
  return new Promise((resolve, reject) => {
    verify(
      data,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, decodedToken) => {
        if (error) {
          errorlog.error(error);
          reject(error);
        } else {
          resolve(decodedToken);
        }
      }
    );
  });
};

module.exports = { returnParsedToken, returnSignedToken };
