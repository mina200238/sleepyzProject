const { Router } = require('express');
const getProduct = require('../controllers/productController');

const router = Router();

router.get('/:product_id', getProduct);

module.exports = router;