/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const OrderSchema = new Schema({
    id: {
        type: BigInt,
        required: true,
    },
    user_id: {
        type: BigInt,
        required: true,
    },
    products_id: {
        type: Array,
        required: true,
    },
    delivery_status: {
        type: String,
        required: true,
    },

});

module.exports = OrderSchema;