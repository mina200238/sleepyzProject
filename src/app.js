const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routers/mainRouter');
const { Product } = require('./models');
const fakeData = require('./static/fakeData.json');
require('dotenv').config();
const allProductsRouter = require('./routers/allProductsRouter');
const productRouter = require('./routers/productRouter');


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

app.use('/', mainRouter);
app.use('/categories', allProductsRouter);
app.use('/product', productRouter);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  const test = async (req, res) => {
    const data = await Product.find({});
    if (data.length === 0) {
      await Product.create(fakeData.product);
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
