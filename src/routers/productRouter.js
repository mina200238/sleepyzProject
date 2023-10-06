const { Router } = require('express');
const { getProduct } = require('../controllers/productController');
const { getProducts } = require('../controllers/productController');
const { latestProducts } = require('../controllers/productController');

const router = Router();

router.get('/latest', latestProducts); // 최신 상품 조회
router.get('/allProducts', getProducts); // 전체 상품 조회
router.get('/:product_id', getProduct); // 단일 상품 조회

module.exports = router;