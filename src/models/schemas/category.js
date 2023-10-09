const { Schema } = require('mongoose');

const CategorySchema = new Schema(
  {
    category_number: {
      type: Number,
      required: true,
    },
    category_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CategorySchema;
