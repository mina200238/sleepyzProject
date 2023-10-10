const mongoose = require('mongoose');

const ProductSchema = require('./schemas/product');
const OrderSchema = require('./schemas/order');
const UserSchema = require('./schemas/user');
const ImageSchema = require('./schemas/image');
const CategorySchema = require('./schemas/category');

exports.Product = mongoose.model('Product', ProductSchema);
exports.User = mongoose.model('User', UserSchema);
exports.Order = mongoose.model('Order', OrderSchema);
exports.Image = mongoose.model('Image', ImageSchema);
exports.Category = mongoose.model('Category', CategorySchema);