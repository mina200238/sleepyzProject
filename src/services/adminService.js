const { Product, Image } = require('../models');

class AdminService {
  // 상품 추가
  async addProduct(name, description, price, category, image_id) {
    const detail_url = [];
    const addImage = await Image.create({ name, image_id, detail_url });
    console.log(addImage._id);
    const addedImage_id = addImage._id;
    const addedProduct = await Product.create({ name, description, price, category, image_id: addedImage_id });
    return addedProduct;
  }

  // 상품 업데이트
  async updateProduct(product_id, name, description, price, category, image_id) {
    const updatedProduct = await Product.updateMany({ _id: product_id }, { name, description, price, category });
    const findImage = await Product.findOne({ _id: product_id });
    await Image.findOneAndUpdate({ _id: findImage.image_id }, { thumbnail_url: image_id });
    return updatedProduct;
  }

  // 상품 삭제
  async signOut(decoded) {
    const { id } = decoded.user;
    const deletedUser = await User.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
    return deletedUser;
  }
}

module.exports = AdminService;
