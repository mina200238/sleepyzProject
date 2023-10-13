const { Router } = require('express');
const {
  signUp,
  signOut,
  login,
  getUserInfo,
  updateUserInfo,
  changePassword,
} = require('../controllers/userController');
const validateToken = require('../middlewares/validateTokenHandler');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/signup', signUp); // 회원 가입

router.post('/signout', validateToken, signOut); // 회원 탈퇴

router.post('/login', login); // 로그인

// router.post('/refresh', validateToken, async (req, res) => {});

router.get('/userInfo', validateToken, getUserInfo); // 사용자 정보 조회

router.put('/userInfo', updateUserInfo); // 사용자 정보 수정

router.put('/password', validateToken, changePassword); // 패스워드 변경

module.exports = router;
