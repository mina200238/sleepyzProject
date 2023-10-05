const asyncHandler = require('express-async-handler');
const { Product } = require('../models');


const getProduct = async (req, res) => { // 상품 하나를 전달
    try {
        const { product_id } = req.params
        const id = String(product_id)
        const product = await Product.find({
            _id: id,
        });
        res.status(200).json({ data: product, message: `${product[0].name}입니다` });
    } catch (err) {
        console.log(err);
    }
};

const latestProducts = async (req, res) => { // 최신 상품을 전달
    try {
        const latestProduct = await Product.find({}).sort({ createdAt: -1 }).limit(6);
        res.status(200).json({ data: latestProduct, message: '최신 상품입니다' });
    } catch (err) {
        console.log(err);
    }
};

const getProducts = async (req, res) => { // 전체 상품을 전달
    try {
        const products = await Product.find({});

        res.status(200).json({ data: products, message: '전체 상품입니다' });
        // res.status(200).json({ data: fakeData, message: '전체 상품입니다' });
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getProduct, getProducts, latestProducts };
