const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../config/validateError');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const refreshToken = req.headers.cookie.split('=')[1];

  if (!refreshToken) {
    throw new UnauthorizedError('Access Denied. No refresh token provided.');
  }

  if (!authorization) {
    throw new UnauthorizedError('Access Denied. No token provided.');
  }

  if (authorization) {
    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        const refreshTokenDecoded = jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
          if (err) throw new UnauthorizedError('123123Access Denied. No token provided.');
        });

        const accessToken = jwt.sign(
          {
            user: {
              username: refreshTokenDecoded.name,
              email: refreshTokenDecoded.email,
              id: refreshTokenDecoded._id,
            },
          },
          process.env.ACCESS_TOKEN_SECERT,
          { expiresIn: '30m' },
        );
        res.header('authorization', accessToken).json(refreshTokenDecoded.user);
        next();
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = validateToken;
