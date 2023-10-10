const { User, Category, Product, Image, Order } = require('../models');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class AdminService {
  // 회원 등록 확인
  async checkRegistration(email) {
    const isRegistered = await User.find({ email: email });
    console.log(isRegistered);
    if (isRegistered.length !== 0 && isRegistered[0].deleted_at) {
      return undefined;
    }
    return isRegistered;
  }
  // 상품 추가
  async addProduct(name, description, price, category, image_id) {
    const detail_url = [];
    const addImage = await Image.create({ name, thumbnail_url: image_id, detail_url });
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
  async deleteProduct(product_id) {
    const deletedProduct = await Product.deleteOne({ _id: product_id });
    return deletedProduct;
  }

  // 🗂️: 카테고리 관련 코드
  // 카테고리 추가 시, 중복 확인
  async checkCategory(category_name) {
    const isExisted = await Category.find({ category_name: category_name });
    if (isExisted.length !== 0) {
      return undefined;
    }
    return isExisted;
  }

  // 카테고리 id가 유효한 지, 확인
  async checkCategoryId(category_id) {
    const isExsisted = await Category.findById({ _id: category_id });
    console.log(isExsisted);
    if (!isExsisted) {
      return undefined;
    }
    return isExsisted;
  }

  // 🤔: _id 서버 500 에러 발생하는 것 방지 -> 필요할까요?
  // id가 ObjectId 형식에 맞는 지, 확인
  async checkObjectId(object_id) {
    if (ObjectId.isValid(object_id)) return false;
    else true;
  }

  // 카테고리 조회
  async getCategories() {
    const categories = await Category.find({});
    return categories;
  }

  // 카테고리 추가
  async createCategory(category_name) {
    const countCategories = await Category.count();
    const newCategory = await Category.create({ category_number: countCategories + 1, category_name });
    return newCategory;
  }

  // 회원 정보 수정
  async updateUserInfo(email, name, phone_number, address) {
    const updatedUserInfo = await User.updateMany({ email: email }, { name, phone_number, address });
    return updatedUserInfo;
  }

  async getAllUserOrders() {
    // 모든 사용자의 주문 조회
    const findOrders = await Order.find({}).populate('user_id');
    return findOrders;
  }

  //주문 배송 상태 수정
  async UpdateOrderInfo(order_id, delivery_status) {
    const UpdatedOrderInfo = await Order.findOneAndUpdate(
      { _id: new Types.ObjectId(order_id) },
      { $set: { delivery_status: delivery_status } },
      { new: true },
      //{ delivery_status: delivery_status }
    );
    return UpdatedOrderInfo;
  }

  //주문 내역 삭제
  async deleteOrders(order_id) {
    const deletedOrder = await Order.findOneAndUpdate(
      { _id: new Types.ObjectId(order_id) },
      { deleted_at: new Date() },
    );
    return deletedOrder;
  }

  // 🗂️: 카테고리 관련 코드
  // 카테고리 추가 시, 중복 확인
  async checkCategory(category_name) {
    const isExisted = await Category.find({ category_name: category_name });
    if (isExisted.length !== 0) {
      return undefined;
    }
    return isExisted;
  }

  // 카테고리 id가 유효한 지, 확인
  async checkCategoryId(category_id) {
    const isExsisted = await Category.findById({ _id: category_id });
    console.log(isExsisted);
    if (!isExsisted) {
      return undefined;
    }
    return isExsisted;
  }

  // 🤔: _id 서버 500 에러 발생하는 것 방지 -> 필요할까요?
  // id가 ObjectId 형식에 맞는 지, 확인
  async checkObjectId(object_id) {
    if (ObjectId.isValid(object_id)) return false;
    else true;
  }

  // 카테고리 조회
  async getCategories() {
    const categories = await Category.find({});
    return categories;
  }

  // 카테고리 추가
  async createCategory(category_name) {
    const countCategories = await Category.count();
    const newCategory = await Category.create({ category_number: countCategories + 1, category_name });
    return newCategory;
  }

  // 카테고리 수정
  async updateCategory(category_id, category_name) {
    const updatedCategory = await Category.findByIdAndUpdate(
      category_id,
      {
        // category_name만 선택해서, 업데이트한다.
        // category_number는 그대로 유지
        category_name: category_name,
      },
      { new: true },
    );

    return updatedCategory;
  }

  // 카테고리 삭제
  async delteCategory(category_id) {
    const category = await Category.findById(category_id);
    await Category.deleteOne({ _id: category._id });
    return category;
  }
}

module.exports = AdminService;
