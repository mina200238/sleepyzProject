const { Router } = require('express');
const { getAllProducts } = require('../controllers/productController');

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllUserOrders,
  updateOrders,
  deleteOrders,
} = require('../controllers/adminController');

const router = Router();

router.get('/products', getAllProducts); // 상품 정보 받아오기
router.post('/products', addProduct); // 상품 추가
router.put('/products', updateProduct); // 상품 수정
router.delete('/products', deleteProduct); // 상품 삭제

router.get('/categories', getCategories); // 카테고리 정보 받아오기
router.post('/categories', createCategory); // 카테고리 추가
router.put('/categories', updateCategory); // 카테고리 수정
router.delete('/categories', deleteCategory); // 카테고리 삭제

router.get('/orders', getAllUserOrders); // 주문 정보 받아오기
router.put('/orders', updateOrders); // 주문 수정
router.delete('/orders', deleteOrders); // 해당 사용자의 주문 내역 삭제

module.exports = router;
