const { Router } = require('express');
const { makeOrder, getUserOrders, getNonMemberOrders } = require('../controllers/orderController');
const { getUserInfo } = require('../controllers/userController');
const validateToken = require('../middlewares/validateTokenHandler');

const router = Router();

router.post('/', makeOrder); // 주문 작성
router.get('/history', validateToken, getUserOrders); // 회원 주문 조회
router.get('/search', getNonMemberOrders); // 비회원 주문 조회
router.get('/', validateToken, getUserInfo); // 주문 작성시 유저 정보 불러오기

module.exports = router;
