const mongoose = require('mongoose');
const ProductSchema = require('./schemas/products');

exports.Product = mongoose.model('Product', ProductSchema);
