const jwt = require("jsonwebtoken");
const { privateKey } = require("./jwtKey");

module.exports = function (req) {
  const token = req.headers.authorization;
  return jwt.verify(token.split(" ")[1], privateKey);
};
