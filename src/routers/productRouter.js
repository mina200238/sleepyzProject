const { Router } = require('express');
const { getProduct } = require('../controllers/productController');
const { getProducts } = require('../controllers/productController');
const { latestProducts } = require('../controllers/productController');

const router = Router();

router.get('/', latestProducts);
router.get('/categories', getProducts);
router.get('/:product_id', getProduct);

module.exports = router;