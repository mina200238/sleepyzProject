const jwt = require('jsonwebtoken');
const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = validateToken;
