/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');
const Image = require('./image');
const Category = require('./category');

const ProductSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image_id: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
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

module.exports = ProductSchema;
