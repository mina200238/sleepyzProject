const { Router } = require('express');
const getProducts = require('../controllers/allProductsController');

const router = Router();

router.get('/', getProducts);

module.exports = router;
