const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../config/validateError');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        UnauthorizedError('User is not authorized');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = validateToken;
