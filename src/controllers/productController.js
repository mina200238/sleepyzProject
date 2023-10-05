const asyncHandler = require('express-async-handler');
const { Product } = require('../models');


const getProduct = async (req, res) => {
    try {
        console.log(req.params)
        const { product_id } = req.params
        const id = Number(product_id)
        const product = await Product.find({
            id: id,
        });
        res.status(200).json({ data: product, message: `${product.name}입니다` });
    } catch (err) {
        console.log(err);
    }
};

module.exports = getProduct;
