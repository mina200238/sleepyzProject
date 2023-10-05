const asyncHandler = require('express-async-handler');
const { Product } = require('../models');
const fakeData = require('../static/fakeData.json');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({ data: products, message: '전체 상품입니다' });
        // res.status(200).json({ data: fakeData, message: '전체 상품입니다' });
    } catch (err) {
        console.log(err);
    }
};

module.exports = getProducts;
