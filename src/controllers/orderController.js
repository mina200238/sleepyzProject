const asyncHandler = require('express-async-handler');
const { Order } = require('../models');

const makeOrder = async (req, res, next) => {
  // 주문 작성
  try {
    const data = req.body;
    const createdData = await Order.create(data);
    res
      .status(200)
      .json({
        data: { order_id: createdData._id },
        message: '주문이 성공적으로 완료되었습니다.',
      });
  } catch (err) {
    next(err);
  }
};

const myOrders = async (req, res, next) => {
  // 주문 조회
  try {
    const { user_id } = req.body;
    const findData = await Order.find({
      user_id: user_id,
    });
    if (findData.length === 0) {
      res.status(404);
      throw new Error('주문을 찾을 수 없습니다.');
    }
    res.status(200).json({ data: findData, message: '주문 조회 성공' });
  } catch (err) {
    next(err);
  }
};

module.exports = { makeOrder, myOrders };
