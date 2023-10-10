//일단 해당하는 부분만 controller 작성
const adminService = require("../services/adminService");

//주문 내역 조회
const getAllUserOrders = async (req, res, next) => {
    try {
        const adminServiceInstance = new adminService();
        const findOrders = await adminServiceInstance.getAllUserOrders();
        if (findOrders.length === 0) {
            throw new NotFoundError('주문을 찾을 수 없습니다.');
        }
        res.status(200).json({ data: findOrders, message: '주문 조회 성공' });
    } catch (err) {
        next(err);
    }
};



//배송 상태 변경
const updateOrders = async (req, res, next) => {
    try {
        const { order_id, delivery_status } = req.body;
        const adminServiceInstance = new adminService();
        const updatedOrderInfo = await adminServiceInstance.UpdateOrderInfo(order_id, delivery_status);
        res.status(200).json({
            data: updatedOrderInfo,
            message: '배송 상태가 변경되었습니다.'
        });
    } catch (err) {
        next(err);
    }
};


// 해당 사용자의 주문 내역 삭제
const deleteOrders = async (req, res, next) => {
    try {
        const { order_id } = req.body;
        const adminServiceInstance = new adminService();
        const updatedUserInfo = await adminServiceInstance.deleteOrders(order_id);
        res.status(200).json({
            data: updatedUserInfo,
            message: '주문 내역이 성공적으로 삭제되었습니다'
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllUserOrders, updateOrders, deleteOrders };
