const { User } = require('../models');
const { jwt } = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = {
    name,
    email,
    password,
    address: [],
    phone_number: [],
    is_admin: 0,
  };

  try {
    const isRegister = await User.find({ email: email });
    if (isRegister.length !== 0) {
      res.status(409);
      throw new Error('이미 가입된 이메일 입니다.');
    }
    const user = await User.create(newUser);
    console.log(user);

    res.status(200).json({ data: null, message: '회원 가입 성공' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  // TODO: 토큰 구현 후 진행
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('잘못된 요청입니다.');
  }
};

const signOut = async (req, res, next) => {
  // TODO: 로그인 구현 후 진행
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signOut, login };
