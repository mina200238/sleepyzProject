const { Router } = require('express');
const { getAllProducts } = require('../controllers/productController');

const { getAllUserOrders, updateOrders, deleteOrders } = require('../controllers/adminController');



const router = Router();

router.get('/products', getAllProducts); // 상품 정보 받아오기
router.post('/products'); // 상품 추가
router.put('/products'); // 상품 수정
router.delete('/products'); // 상품 삭제

router.get('/category'); // 카테고리 정보 받아오기
router.post('/category'); // 카테고리 추가
router.put('/category'); // 카테고리 수정
router.delete('/category'); // 카테고리 삭제

router.get('/orders', getAllUserOrders); // 주문 정보 받아오기
router.put('/orders', updateOrders); // 주문 수정
router.post('/orders', deleteOrders); // 해당 사용자의 주문 내역 삭제

module.exports = router;
