// 테스트용 데이터
const prodMockData = '/src/static/fakeData.json';

let cartData = [];

// 장바구니 데이터 가져오기
const getCartData = async function () {
  try {
    // indexedDB 초기화
    const dbName = 'shoppingCartDB';
    const dbVersion = '1';
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event) {
      console.error('데이터베이스 생성 에러: ', event.target.errorCode);
    };

    // 요청 성공 시,
    request.onsuccess = async function (event) {
      const db = event.target.result;
      const transaction = db.transaction(['cart'], 'readwrite');
      const store = transaction.objectStore('cart');

      // 모든 장바구니 데이터 가져오기
      const cartDataAll = await store.getAll();
      console.log(cartDataAll);

      renderCartData(cartDataAll);

      // // 모든 장바구니 데이터 가져오기
      // const cursor = store.openCursor();
      // cursor.onsuccess = function (event) {
      //   const cursorResult = event.target.result;

      //   if (cursorResult) {
      //     cartData.push(cursorResult.value);
      //     cursorResult.continue();
      //   } else {
      //     // 장바구니 데이터를 화면에 보여주는 함수 호출
      //     renderCartData();
      //   }
      // };
    };
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
              <label for="count">수량 변경</label>
              <select id="count" name="count">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
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
