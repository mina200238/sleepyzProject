const { Order } = require('../models');
const { Types } = require('mongoose');

class adminService {

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
      { new: true }
      //{ delivery_status: delivery_status }
    )
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
}

module.exports = adminService;
