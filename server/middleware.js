const jwt = require("jsonwebtoken");

// Generate a JWT secret using
// require('crypto').randomBytes(64).toString('hex')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } else res.sendStatus(401);
};

module.exports = authenticateJWT;
