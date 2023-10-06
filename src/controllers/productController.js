const { Product } = require('../models');

const getProduct = async (req, res, next) => {
  // 상품 하나를 전달
  try {
    const { product_id } = req.params;
    const id = String(product_id);
    const product = await Product.find({
      _id: id,
    });
    if (product.length === 0) {
      res.status(404);
      throw new Error('상품이 없습니다!');
    }
    res
      .status(200)
      .json({ data: product, message: `${product[0].name}입니다` });
  } catch (err) {
    next(err);
  }
};

const latestProducts = async (req, res, next) => {
  // 최신 상품을 전달
  try {
    const latestProduct = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(6);
    if (latestProduct.length === 0) {
      res.status(404);
      throw new Error('상품이 없습니다!');
    }
    res.status(200).json({ data: latestProduct, message: '최신 상품입니다' });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  // 전체 상품을 전달
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      res.status(404);
      throw new Error('상품이 없습니다!');
    }
    res.status(200).json({ data: products, message: '전체 상품입니다' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProduct, getProducts, latestProducts };
