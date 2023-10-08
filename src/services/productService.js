const { Product } = require('../models');

class ProductService {
  async getProduct(product_id) {
    // 상품 하나 전달
    const id = String(product_id);
    const product = await Product.find({
      _id: id,
    }).populate('image_id');

    return product;
  }

  async getRecentProducts(number) {
    // 최신 상품 전달
    const skipProduct = await Product.count();
    const recentPoducts = await Product.find()
      .populate('image_id')
      .skip(skipProduct - number);
    return recentPoducts;
  }

  async getAllProducts() {
    // 모든 상품 전달
    const allProducts = await Product.find({}).populate('image_id');
    return allProducts;
  }
}

module.exports = ProductService;
