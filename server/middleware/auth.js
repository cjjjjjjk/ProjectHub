// server/middleware/auth.js
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, "secretKey");
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = { validateToken };
