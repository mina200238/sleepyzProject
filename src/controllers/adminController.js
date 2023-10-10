const AdminService = require('../services/adminService');

const { NotFoundError, BadRequestError, ConflictError } = require('../config/validateError');

const getCategories = async (req, res, next) => {
  try {
    const adminService = new AdminService();
    const categories = await adminService.getCategories();
    // console.log(categories);
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
    console.log(checkCategory);
    if (!checkCategory) {
      throw new ConflictError('중복된 카테고리입니다');
    }

    const newCategory = await adminService.createCategory(category_name);
    res.status(200).json({
      category_data: { category_number: newCategory.category_number, cateogry_name: newCategory.category_name },
      message: '새로운 카테고리를 등록하였습니다',
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const { category_name } = req.body;
    if (!category_name) throw new BadRequestError('카테고리 이름을 기입해주세요.');

    const adminService = new AdminService();
    const updatedCategory = await adminService.updateCategory(category_id, category_name);
    console.log(updatedCategory);
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
    const { category_id } = req.params;

    const adminService = new AdminService();
    const isObjectId = await adminService.checkObjectId(category_id);
    if (!isObjectId) {
      throw new BadRequestError('잘못된 요청입니다.');
    }

    const checkCategory = await adminService.checkCategoryId(category_id);
    if (!checkCategory) {
      throw new BadRequestError('잘못된 요청입니다.');
    }
    const deletedCategory = await adminService.delteCategory(category_id);
    // console.log(deletedCategory);

    res.status(200).json({
      category_data: {},
      message: '카테고리가 성공적으로 삭제되었습니다.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
