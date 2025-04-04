const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils/config");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", ""); // Extract the token

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
