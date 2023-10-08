const { Router } = require('express');
const { makeOrder, getUserOrders } = require('../controllers/orderController');

const router = Router();

router.post('/', makeOrder); // 주문 작성
router.get('/:user_id', getUserOrders); // 주문 조회

module.exports = router;
