/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  image_id: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });

module.exports = ProductSchema;
