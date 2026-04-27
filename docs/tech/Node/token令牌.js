const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const secret = "fdkjfkdjfjfkdj";

function setToken(username) {
  return jwt.sign({ username }, secret, { expiresIn: "10s" });
}
const verifyToken = expressjwt({
  secret,
  algorithms: ["HS256"],
}).unless({ path: ["/login"] });

module.exports = {
  setToken,
  verifyToken,
};
