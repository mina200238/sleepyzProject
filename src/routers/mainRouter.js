const { Router } = require('express');
const getProducts = require('../controllers/mainController');

const router = Router();

router.get('/', getProducts);

module.exports = router;
