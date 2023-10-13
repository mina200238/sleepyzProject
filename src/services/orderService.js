const { Order } = require('../models');

class OrderService {
  async makeOrder(data) {
    // 주문 작성
    const createdData = await Order.create(data);
    return createdData;
  }

  async getUserOrders(email) {
    // 주문 조회
    const findData = await Order.find({
      email: email,
    });
    return findData;
  }
}

module.exports = OrderService;
