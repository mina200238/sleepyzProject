const OrderService = require('../services/orderService');
const { NotFoundError } = require('../config/validateError');

const makeOrder = async (req, res, next) => {
  // 주문 작성
  try {
    const data = req.body;
    const orderService = new OrderService();
    const createdData = await orderService.makeOrder(data);
    res.status(200).json({
      data: { order_id: createdData._id },
      message: '주문이 성공적으로 완료되었습니다.',
    });
  } catch (err) {
    next(err);
  }
};

const getUserOrders = async (req, res, next) => {
  // 회원 주문 조회
  try {
    const decoded = req.decoded;
    const findEmail = decoded.user.email;
    const orderService = new OrderService();
    const findData = await orderService.getUserOrders(findEmail);
    if (findData.length === 0) {
      throw new NotFoundError('주문을 찾을 수 없습니다.');
    }
    res.status(200).json({ data: findData, message: '주문 조회 성공' });
  } catch (err) {
    next(err);
  }
};

const getNonMemberOrders = async (req, res, next) => {
  // 비회원 주문 조회
  try {
    const { email } = req.query;
    const orderService = new OrderService();
    const findData = await orderService.getUserOrders(email);
    if (findData.length === 0) {
      throw new NotFoundError('주문을 찾을 수 없습니다.');
    }
    res.status(200).json({ data: findData, message: '주문 조회 성공' });
  } catch (err) {
    next(err);
  }
};

module.exports = { makeOrder, getUserOrders, getNonMemberOrders };
