const asyncHandler = require('express-async-handler');
const { Product } = require('../models');
const fakeData = require('../static/fakeData.json');

const getProducts = async (req, res) => {
  try {
    const latestProduct = await Product.find({}).sort({ createdAt: -1 }).limit(6);
    res.status(200).json({ data: latestProduct, message: '최신 상품입니다' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getProducts;
