const { Router } = require('express');
const { signUp, signOut, login } = require('../controllers/userController');
const validateToken = require('../middlewares/validateTokenHandler');

const router = Router();

router.post('/signup', signUp); // 회원 가입

router.post('/signout', validateToken, signOut); // 회원 탈퇴

router.post('/login', login); // 로그인

module.exports = router;
