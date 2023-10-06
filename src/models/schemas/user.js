/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: Array,
      required: true,
    },
    phone_number: {
      type: Array,
      required: true,
    },
    is_admin: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = UserSchema;
