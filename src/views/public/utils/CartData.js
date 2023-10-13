import updateBadge from '/public/utils/UpdateBadge.js';

// 장바구니 데이터를 로컬 스토리지에서 가져오는 함수
function getCart(product) {
  const productId = String(product._id);
  const cart = localStorage.getItem(`product_${productId}`);
  return cart ? JSON.parse(cart) : [];
}

// 장바구니 데이터를 로컬 스토리지에 저장하는 함수
function saveCart(product, cart) {
  const productId = String(product._id);
  localStorage.setItem(`product_${productId}`, JSON.stringify(cart));
}

// 장바구니에 상품 추가하는 함수
function addToCart(product, currentQuantity) {
  // 현재의 장바구니 데이터 조회
  const cart = getCart(product) || [];

  // 이미 존재하는 아이템인지 확인
  const existingProdIndex = cart.findIndex((item) => item.productId === product._id);

  if (existingProdIndex !== -1) {
    // 이미 장바구니에 존재하는 상품일 때 수량 증가
    if (window.confirm('이미 장바구니에 존재하는 상품입니다.\n상품을 추가하시겠습니까?')) {
      cart[existingProdIndex].quantity += currentQuantity;
      saveCart(product, cart);
    } else {
      return false;
    }
  } else {
    // 장바구니에 없는 상품일 때 상품 추가
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: currentQuantity,
    });
  }
  // 상품의 이미지를 로컬 스토리지에 저장
  localStorage.setItem(`productImage_${product._id}`, product.image_id.thumbnail_url[0]);

  saveCart(product, cart); // 장바구니 데이터를 로컬 스토리지에 저장
  updateBadge();

  if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
    window.location.href = '/pages/Cart/Cart.html';
  }
  return false;
}

// 장바구니에서 상품 삭제하는 함수
function removeFromCart(product) {
  const productId = String(product._id);
  localStorage.removeItem(`product_${productId}`);
  updateBadge();
}

export { getCart, saveCart, addToCart, removeFromCart };
