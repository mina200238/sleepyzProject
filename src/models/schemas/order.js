/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const OrderSchema = new Schema(
  {
    user_id: {
      type: String,
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
      type: String,
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
    receiver_address: {
      type: String,
      required: true,
    },
    delivery_status: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = OrderSchema;
