const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const { Product } = require('./models');
const { Order } = require('./models');
const { User } = require('./models');
const { Image } = require('./models');
const fakeData = require('./static/fakeData.json');
const fakeOrder = require('./static/fakeOrder.json');
const fakeUser = require('./static/fakeUser.json');
const fakeImage = require('./static/fakeImage.json');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');
require('dotenv').config();
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler');

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // body-parser

app.use('/products', productRouter); // 단일 상품 조회

app.use('/orders', orderRouter); // 주문 작성, 주문 조회
app.use('/users', userRouter);

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  const test = async (req, res) => {
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
  };
  test();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
