const { Router } = require('express');
const { makeOrder, getUserOrders } = require('../controllers/orderController');
const { getUserInfo } = require('../controllers/userController');
const validateToken = require('../middlewares/validateTokenHandler');

const router = Router();

router.get('/', validateToken, getUserInfo); // 주문페이지 유저 정보 가져오기
router.post('/', makeOrder); // 주문 작성
router.get('/:user_id', getUserOrders); // 주문 조회

module.exports = router;
