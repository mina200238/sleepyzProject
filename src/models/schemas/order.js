/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    products_id: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    address: {
      type: Array,
      required: true,
    },
    receiver_name: {
      type: String,
      required: true,
    },
    receiver_phone_number: {
      type: String,
      required: true,
    },
    delivery_status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = OrderSchema;
