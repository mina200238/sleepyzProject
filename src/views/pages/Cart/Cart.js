// 장바구니 데이터 가져오기
const getCartData = async function () {
  try {
  } catch (error) {
    console.error('데이터를 로드할 수 없습니다', error);
  }
};

const renderCartData = function (data) {
  // 화면에 데이터 렌더링하는 코드
  const cartList = document.querySelector('.cart-list');
  // 기존 상품 목록 초기화
  cartList.innerHTML = '';

  // cartData 배열에서 가져온 상품 정보 렌더링
  data.forEach((product) => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
     <input id="prod${product._id}" type="checkbox" value="" />
      <label for="prod${product._id}">
        <div class="item">
          <div class="img-box">
            <img class="" src="${product.image_id}" alt="" />
          </div>
          <div class="cartitems-info">
            <span class="item-name">${product.name}</span>
            <span class="item-price">${product.price.toLocaleString()} 원</span>
            <div class="amount-opt">
              <form action="">
                <label for="quantity">수량</label>
                <input type="button" id="minus" value="-">
                <input type="text" id="quantity" value="1" size="1"/>
                <input type="button" id="plus" value="+">
              </form>
            </div>
          </div>
        </div>
      </label>
    `;

    cartList.appendChild(cartItem);
  });
};

// 페이지 로드 시, 장바구니 데이터 가져와서 화면에 렌더링
window.addEventListener('DOMContentLoaded', async () => {
  const cartData = await getCartData();

  renderCartData(cartData);
});

// 상품 수량 수정
const updateCartItemQuantity = function (productId, newQuantity) {
  // indexedDB 사용해서 상품 수량 수정
};

// 상품 삭제
const deleteCartItem = function (productId) {
  // indexedDB 사용해서 해당 상품 삭제
};
