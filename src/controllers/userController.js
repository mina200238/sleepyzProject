const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('../services/userService');

const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = new Error('모든 정보가 필요합니다!');
      error.statusCode = 400;
      throw error;
    }

    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (isRegistered.length !== 0) {
      const error = new Error('이미 가입된 이메일 입니다!!!');
      error.statusCode = 409;
      throw error;
    }
    const user = await userService.signUp(name, email, password);
    if (!user) {
      const error = new Error('서버 오류 입니다.');
      throw error;
    }
    res.status(200).json({ data: null, message: '회원 가입 성공' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error('잘못된 요청입니다.');
      error.statusCode = 400;
      throw error;
    }
    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (!isRegistered) {
      const error = new Error('이미 탈퇴한 회원 입니다!!!');
      error.statusCode = 404;
      throw error;
    }

    const accessToken = await userService.login(email, password);
    if (!accessToken) {
      const error = new Error('이메일 또는 비밀번호를 잘못 입력하셨습니다.');
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    const decoded = req.decoded;
    const userService = new UserService();
    await userService.signOut(decoded);

    res.status(200).json({ data: null, message: '회원 탈퇴가 되었습니다.' });
  } catch (err) {
    next(err);
  }
};
module.exports = { signUp, signOut, login };
