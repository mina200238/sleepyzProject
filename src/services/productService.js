const { Product, Category } = require('../models');

class ProductService {
  async getProduct(product_id) {
    // 상품 하나 전달
    const id = String(product_id);
    const product = await Product.find({
      _id: id,
    }).populate('image_id');

    return product;
  }

  async getRecentProducts(limit) {
    // 최신 상품 전달
    const skipProduct = await Product.count();
    const recentPoducts = await Product.find()
      .populate('image_id')
      .skip(skipProduct - limit);
    return recentPoducts;
  }

  async getAllProducts() {
    // 모든 상품 전달
    const allProducts = await Product.find({}).populate('image_id');
    return allProducts;
  }

  async getCategoryProducts(category_name) {
    // 카테고리별 상품 전달
    const category = await Category.findOne({ category_name });
    const categoryProducts = await Product.find({
      category: category._id,
    }).populate('image_id');
    return categoryProducts;
  }
}

module.exports = ProductService;
