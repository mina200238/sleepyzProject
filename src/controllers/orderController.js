const asyncHandler = require('express-async-handler');
const { Order } = require('../models');


const makeOrder = async (req, res) => { // 주문 작성
    try {
        const data = req.body
        const createdData = await Order.create(data);

        res.status(200).json({ data: { "order_id": createdData._id }, message: "주문이 성공적으로 완료되었습니다." });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "data": null,
            "message": "서버 내부의 오류가 발생했습니다. 나중에 다시 시도해주세요."
        })
    }
};

const myOrders = async (req, res) => { // 주문 조회
    try {
        const { user_id } = req.body;
        const findData = await Order.find({
            user_id: user_id
        });
        if (findData.length === 0) {
            res.status(404).json({
                "data": null,
                "message": "주문 내역이 없습니다."
            });


        } else {
            res.status(200).json({ data: findData, message: "주문 조회 성공" });


        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            "data": null,
            "message": "서버 내부의 오류가 발생했습니다. 나중에 다시 시도해주세요."
        })
    }
};

module.exports = { makeOrder, myOrders };