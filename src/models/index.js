const mongoose = require('mongoose');

const ProductSchema = require('./schemas/product');
const OrderSchema = require('./schemas/order');
const ImageSchema = require('./schemas/image');

exports.Product = mongoose.model('Product', ProductSchema);
exports.Order = mongoose.model('Order', OrderSchema);
exports.Image = mongoose.model('Image', ImageSchema);
