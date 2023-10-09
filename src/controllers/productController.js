const ProductService = require('../services/productService');

const getProduct = async (req, res, next) => {
  // 상품 하나를 전달
  try {
    const { product_id } = req.params;
    const productService = new ProductService();
    const product = await productService.getProduct(product_id);
    if (product.length === 0) {
      const error = new Error('상품이 없습니다!!@@');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: product, message: `${product[0].name}입니다` });
  } catch (err) {
    next(err);
  }
};

const getRecentProducts = async (req, res, next) => {
  // 최신 상품을 전달
  try {
    const { limit } = req.query;
    const productService = new ProductService();
    const recentProducts = await productService.getRecentProducts(limit);
    if (recentProducts.length === 0) {
      const error = new Error('상품이 없습니다!!@@');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: recentProducts, message: '최신 상품입니다' });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  // 전체 상품을 전달
  try {
    const productService = new ProductService();
    const allProducts = await productService.getAllProducts();
    if (allProducts.length === 0) {
      const error = new Error('상품이 없습니다!!@@');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: allProducts, message: '전체 상품입니다' });
  } catch (err) {
    next(err);
  }
};

const getCategoryProducts = async (req, res, next) => {
  // 카테고리 상품 전달
  try {
    const { category_name } = req.body;
    const productService = new ProductService();
    const categoryProducts = await productService.getCategoryProducts(category_name);
    res.status(200).json({ data: categoryProducts, message: `${category_name} 상품입니다` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProduct, getAllProducts, getRecentProducts, getCategoryProducts };
