// 장바구니 데이터를 로컬 스토리지에서 가져오는 함수
function getCart() {
  const cart = localStorage.getItem('added Item');
  return cart ? JSON.parse(cart) : [];
}

// 장바구니 데이터를 로컬 스토리지에 저장하는 함수
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 장바구니에 상품 추가하는 함수
function addToCart(product, currentQuantity) {
  // 현재의 장바구니 데이터 조회
  const cart = getCart() || [];

  // 이미 존재하는 아이템인지 확인
  const existingProdIndex = cart.findIndex((item) => item.productId === product.productID);

  if (existingProdIndex !== -1) {
    //이미 장바구니에 존재하는 상품일 땐 수량 증가
    cart[existingProdIndex].quantity = currentQuantity;
  } else {
    // 장바구니에 없는 상품일 땐 상품 추가
    cart.push({
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity: currentQuantity,
    });
  }
  saveCart(cart); // 장바구니 데이터를 로컬 스토리지에 저장
}

export { getCart, saveCart, addToCart };
