const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('express-async-errors');
const dbFill = require('./config/dbFill');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const errorHandler = require('./middlewares/errorHandler');
const isAdmin = require('./middlewares/isAdmin');

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, '/views'))); // 정적 파일 서빙

app.use(cors()); // cors 허용
app.use(express.json()); // body-parser

// 정적 파일 사용
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', (req, res) => {
  // 메인 페이지 서빙
  const filePath = path.join(__dirname, 'views/pages/Main', 'Main.html');
  res.sendFile(filePath);
});
app.get('/:page', (req, res) => {
  // 그외 페이지 서빙
  const { page } = req.params;
  const filePath = path.join(__dirname, `views/pages/${page}`, `${page}.html`);
  res.sendFile(filePath);
});

app.use('/products', productRouter); // 상품 관련 기능
app.use('/orders', orderRouter); // 주문 관련 기능
app.use('/users', userRouter); // 유저 관련 기능
app.use('/admin', adminRouter); // 관리자 관련 기능
// app.use('/admin', isAdmin, adminRouter); // 관리자 관련 기능

app.use(errorHandler); // 에러 처리 미들웨어

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  dbFill();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
