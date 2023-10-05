const { Router } = require('express');
const { makeOrder, myOrders } = require('../controllers/orderController');

const router = Router();

router.post('/', makeOrder); // 주문 작성
router.get('/', myOrders); // 주문 조회

module.exports = router;