/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const ImageSchema = new Schema({
  id: {
    type: BigInt,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  detail_url: {
    type: String,
    required: true,
  },
});

module.exports = ImageSchema;
