const { Product, Category } = require('../models');
const CategorySchema = require('../models/schemas/category');

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

  async getCategoryProducts(category_name) {
    // 카테고리별 상품 전달
    console.log("여기2", category_name)
    // const category = await Category.findOne({ category_name: category_name })
    // console.log("여기", category);
    // const categoryProducts = await Product.find({
    //   category: category._id
    // })
    // return categoryProducts;
  }

}




module.exports = ProductService;
