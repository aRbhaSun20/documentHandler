const { verify } = require("jsonwebtoken");
const { returnParsedToken } = require("../utils/token");
require("dotenv").config();

const Authentication = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    returnParsedToken(bearerHeader)
      .then((data) => {
        req.userData = data;
        next();
      })
      .catch(() => {
        res.status(401).json({ error: "token invalid" });
      });
  } else {
    res.status(401).json({ error: "token missing" });
  }
};

module.exports = { Authentication };
