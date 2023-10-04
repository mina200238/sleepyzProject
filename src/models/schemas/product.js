/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const ProductSchema = new Schema({
    id: {
        type: BigInt,
        required: true,
    },
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
        type: Number,
        required: true,
    },
});

module.exports = ProductSchema;
