const { Product } = require('../models');

const AdminService = require('../services/adminService');
const { BadRequestError, ConflictError, InternalServerError, NotFoundError } = require('../config/validateError');

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image_id } = req.body;
    if (!name || !description || !price || !category || !image_id) {
      throw new BadRequestError('모든 정보가 필요합니다,');
    }

    const adminService = new AdminService();

    const addedProduct = await adminService.addProduct(name, description, price, category, image_id);
    if (!addedProduct) {
      throw new InternalServerError('서버 오류 입니다.');
    }
    res.status(200).json({ data: null, message: '상품 추가 성공' });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  // 상품 수정
  try {
    const { product_id, name, description, price, category, image_id } = req.body;
    if (!product_id || !name || !description || !price || !category || !image_id) {
      throw new BadRequestError('잘못된 요청입니다.');
    }
    const adminService = new AdminService();
    const updatedProduct = await adminService.updateProduct(product_id, name, description, price, category, image_id);
    res.status(200).json({
      data: null,
      message: '상품 정보가 변경되었습니다.',
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  // 상품 삭제
  try {
    const { product_id } = req.body;
    if (!product_id) {
      throw new BadRequestError('잘못된 요청입니다.');
    }
    const adminService = new AdminService();
    const deletedProduct = await adminService.deleteProduct(product_id);
    if (deletedProduct.deletedCount !== 0) {
      res.status(200).json({ data: null, message: '상품이 삭제 되었습니다.' });
    } else {
      throw new NotFoundError('해당 상품이 없습니다.');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { addProduct, updateProduct, deleteProduct };
