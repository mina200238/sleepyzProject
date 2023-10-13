const fakeData = require('../static/fakeData.json');
const fakeOrder = require('../static/fakeOrder.json');
const fakeUser = require('../static/fakeUser.json');
const fakeImage = require('../static/fakeImage.json');
const { Product, Order, User, Image, Category } = require('../models');
const fakeCategory = require('../static/fakeCategory.json');

const dbFill = async (req, res) => {
  const productData = await Product.count().exec();
  if (!productData) {
    await Product.insertMany(fakeData.product);
    console.log('상품 데이터 성공');
  }
  const orderData = await Order.count().exec();
  if (!orderData) {
    await Order.insertMany(fakeOrder.order);
    console.log('주문 데이터 성공');
  }

  const userData = await User.count().exec();
  if (!userData) {
    await User.insertMany(fakeUser.user);
    console.log('유저 데이터 성공');
  }

  const imageData = await Image.count().exec();
  if (!imageData) {
    await Image.insertMany(fakeImage.image);
    console.log('이미지 데이터 성공');
  }

  const categoryData = await Category.count().exec();
  if (!categoryData) {
    await Category.insertMany(fakeCategory.category);
    console.log('카테고리 데이터 성공');
  }
};

module.exports = dbFill;
