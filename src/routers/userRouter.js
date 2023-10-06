const { Router } = require('express');
const { signUp, signOut } = require('../controllers/userController');

const router = Router();

router.post('/signup', signUp); // 회원 가입

router.delete('/signout', signOut); // 회원 탈퇴

module.exports = router;
