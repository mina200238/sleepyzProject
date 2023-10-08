const { Router } = require('express');
const { getProduct } = require('../controllers/productController');
const { getAllProducts } = require('../controllers/productController');
const { getRecentProducts } = require('../controllers/productController');

const router = Router();

router.get('/', getAllProducts); // 전체 상품 조회
router.get('/recent', getRecentProducts); // 최신 상품 조회
router.get('/:product_id', getProduct); // 단일 상품 조회

module.exports = router;
