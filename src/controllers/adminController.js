const AdminService = require('../services/adminService');

const { NotFoundError, BadRequestError, ConflictError } = require('../config/validateError');

const getCategories = async (req, res, next) => {
  // 카테고리 목록 정보 가져오기
  try {
    const adminService = new AdminService();
    const categories = await adminService.getCategories();
    if (categories.length === 0) {
      throw new NotFoundError('카테고리가 없습니다!');
    }
    res.status(200).json({ category_data: categories, message: '카테고리입니다.' });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    if (!category_name) throw new BadRequestError('카테고리 이름을 기입해주세요.');

    const adminService = new AdminService();
    const checkCategory = await adminService.checkCategory(category_name);

    if (!checkCategory) {
      throw new ConflictError('중복된 카테고리입니다');
    }

    const newCategory = await adminService.createCategory(category_name);
    res.status(200).json({
      category_data: { category_name: newCategory.category_name },
      message: '새로운 카테고리를 등록하였습니다',
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    // const { category_id, category_name } = req.body;

    const { original_category_name, new_category_name } = req.body.data;
    if (!new_category_name) throw new BadRequestError('카테고리 이름을 기입해주세요.');

    const adminService = new AdminService();
    // const updatedCategory = await adminService.updateCategory(category_id, category_name);
    const updatedCategory = await adminService.updateCategory(original_category_name, new_category_name);

    res.status(200).json({
      category_data: { category_name: updatedCategory.category_name },
      message: '카테고리를 성공적으로 수정하였습니다',
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { category_id } = req.headers;

    const adminService = new AdminService();
    const isObjectId = await adminService.checkObjectId(category_id);
    if (!isObjectId) {
      throw new BadRequestError('잘못된 요청입니다. ObjectId');
    }

    const checkCategory = await adminService.checkCategoryId(category_id);
    if (!checkCategory) {
      throw new BadRequestError('잘못된 요청입니다.');
    }
    await adminService.delteCategory(category_id);

    res.status(200).json({
      category_data: {},
      message: '카테고리가 성공적으로 삭제되었습니다.',
    });
  } catch (err) {
    next(err);
  }
};
const updateProduct = async (req, res, next) => {
  // 상품 수정
  try {
    const { product_id, name, description, price, category, image_id } = req.body;
    if (!product_id || !name || !description || !price || !category) {
      throw new BadRequestError('잘못된 요청입니다.');
    }
    const adminService = new AdminService();
    const updatedProduct = await adminService.updateProduct(
      product_id,
      name,
      description,
      price,
      category,
      image_id[0] !== null ? image_id : false,
    );
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
    const { product_id } = req.headers;
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

const addProduct = async (req, res, next) => {
  // 상품 추가
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

const getAllUserOrders = async (req, res, next) => {
  try {
    const adminService = new AdminService();
    const findOrders = await adminService.getAllUserOrders();
    if (findOrders.length === 0) {
      throw new NotFoundError('주문을 찾을 수 없습니다.');
    }
    res.status(200).json({ data: findOrders, message: '주문 조회 성공' });
  } catch (err) {
    next(err);
  }
};

//배송 상태 변경
const updateOrders = async (req, res, next) => {
  try {
    const { order_id, delivery_status } = req.body;
    const adminService = new AdminService();
    const updatedOrderInfo = await adminService.UpdateOrderInfo(order_id, delivery_status);

    if (updatedOrderInfo) {
      res.status(200).json({
        data: null,
        message: '배송 상태가 변경되었습니다.',
      });
    } else {
      throw new NotFoundError('주문을 찾을 수 없습니다.');
    }
  } catch (err) {
    next(err);
  }
};

// 해당 사용자의 주문 내역 삭제
const deleteOrders = async (req, res, next) => {
  try {
    const { order_id } = req.headers;
    const adminService = new AdminService();
    const updatedUserInfo = await adminService.deleteOrders(order_id);
    res.status(200).json({
      data: updatedUserInfo,
      id: order_id,
      message: '주문 내역이 성공적으로 삭제되었습니다',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUserOrders,
  updateOrders,
  deleteOrders,
};
