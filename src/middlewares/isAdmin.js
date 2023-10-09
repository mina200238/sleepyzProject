const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UnauthorizedError } = require('../config/validateError');

const isAdmin = async (req, res, next) => {
  const checkDB = async (email) => {
    const checkUser = await User.find({ email: email });
    if (checkUser[0].admin_role !== 0) return true;
    else return false;
  };
  const { authorization } = req.headers;

  let findEmail;
  if (authorization) {
    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        throw new UnauthorizedError('User is not authorized');
      } else {
        findEmail = decoded.user.email;
      }
    });
  }
  const check = await checkDB(findEmail);
  if (!check) {
    throw new UnauthorizedError('User is not admin');
  } else {
    next();
  }
};

module.exports = isAdmin;
