const express = require('express');
const mongoose = require('mongoose');
const { Product } = require('./models');
const { Order } = require('./models');
const fakeData = require('./static/fakeData.json');
const fakeOrder = require('./static/fakeOrder.json');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
require('dotenv').config();
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // body-parser

app.use('/products', productRouter); // 단일 상품 조회

app.use('/orders', orderRouter); // 주문 작성, 주문 조회

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  const test = async (req, res) => {
    const productData = await Product.count().exec();
    if (!productData) {
      await Product.insertMany(fakeData.product);
      console.log('성공');
    }
    const orderData = await Order.count().exec();
    if (!orderData) {
      await Order.insertMany(fakeOrder.order);
      console.log('성공');
    }

    // 🤔: _id를 그냥 id로 사용 할 수 있을까요?
    // console.log(data[0]._id.toString()); // 651d24ced801f4471025046d
  };
  test();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
