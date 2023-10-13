const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('../services/userService');
const { BadRequestError, ConflictError, InternalServerError, NotFoundError } = require('../config/validateError');

const signUp = async (req, res, next) => {
  try {
    const { name, email, password, phone_number, address } = req.body;
    if (!name || !email || !password || !phone_number || !address) {
      throw new BadRequestError('모든 정보가 필요합니다');
    }

    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (isRegistered.length !== 0) {
      throw new ConflictError('이미 가입된 이메일입니다!');
    }
    const user = await userService.signUp(name, email, password, phone_number, address);
    if (!user) {
      throw new InternalServerError('서버 오류 입니다.');
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
      throw new BadRequestError('잘못된 요청입니다.');
    }
    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (!isRegistered) {
      throw new NotFoundError('이미 탈퇴한 회원 입니다!!!');
    }

    const [accessToken, refreshToken] = await userService.login(email, password);

    if (!accessToken) {
      throw new BadRequestError('이메일 또는 비밀번호를 잘못 입력하셨습니다.');
    }

    res
      .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', secure: true })
      .status(200)
      .json({ accessToken });
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

const getUserInfo = async (req, res, next) => {
  try {
    const decoded = req.decoded;
    const findEmail = decoded.user.email;
    const userService = new UserService();
    const userInfo = await userService.checkRegistration(findEmail);
    const { email, name, phone_number, address } = userInfo[0];
    res.status(200).json({
      data: { email, name, phone_number, address },
      message: '유저 정보입니다.',
    });
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { email, name, phone_number, address } = req.body;

    const userService = new UserService();
    const updatedUserInfo = await userService.updateUserInfo(email, name, phone_number, address);

    res.status(200).json({
      data: null,
      message: '회원 정보가 변경되었습니다.',
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const decoded = req.decoded;
    const findEmail = decoded.user.email;
    const { new_password } = req.body;

    const userService = new UserService();
    await userService.changePassword(findEmail, new_password);

    res.status(200).json({
      data: null,
      message: '회원 정보가 변경되었습니다.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signOut, login, getUserInfo, updateUserInfo, changePassword };
