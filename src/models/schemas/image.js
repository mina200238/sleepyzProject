/* eslint-disable prettier/prettier */
const { Schema } = require('mongoose');

const ImageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: Array,
    required: true,
  },
  detail_url: {
    type: Array,
    required: true,
  },
  deleted_at: {
    type: Date,
  },
});

module.exports = ImageSchema;
