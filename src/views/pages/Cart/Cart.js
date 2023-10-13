function updateBadge() {
  const badgeElement = document.getElementById('cart-badge');

  if (badgeElement) {
    // 로컬 스토리지에서 key들을 모두 가져옴
    const keys = Object.keys(localStorage);

    // "product_"로 시작하는 key들만 필터링
    const productKeys = keys.filter((key) => key.startsWith('product_'));

    // "product_"로 시작하는 key들의 개수를 사용하여 뱃지 아이콘 업데이트
    badgeElement.textContent = productKeys.length.toString();
  }
}

const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';
let currentQuantity = 1;

// 페이지 로드 시, 장바구니 데이터 가져와서 화면에 렌더링
window.addEventListener('DOMContentLoaded', function () {
  renderCartData();
  // updateAllCheckboxes();
  updateOrderSummary();

  return currentQuantity;
});

// 개별 체크박스 'change' 이벤트 핸들러
function updateAllCheckboxes() {
  const cartItems = document.querySelectorAll('.cart-item');
  const allCheckboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');

  let selectedCount = 0;
  allCheckboxes.forEach((cb) => {
    if (cb.checked) {
      selectedCount++;
    }
  });

  // 모든 개별 체크박스가 선택된 경우 "전체 선택" 체크박스도 선택
  // 아무 체크박스도 선택되지 않은 경우 "전체 선택" 체크박스도 선택 해제
  selectAllCheckbox.checked = selectedCount === cartItems.length;

  // 중간 상태를 제거
  selectAllCheckbox.indeterminate = false;

  updateOrderSummary();
}

// 상품이 하나라도 존재하는지 여부
let hasProducts = false;

const renderCartData = function (productId) {
  // 화면에 데이터 렌더링하는 코드
  const cartList = document.querySelector('.cart-list');
  // 기존 상품 목록 초기화
  cartList.innerHTML = '';

  let productCount = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('product_')) {
      productCount++;
    }
  }

  // 장바구니에 담긴 상품이 없을 때
  if (productCount === 0) {
    const noItemsText = document.createElement('p');
    noItemsText.classList.add('empty-cart');
    noItemsText.textContent = '장바구니에 담긴 상품이 없습니다 🛒';
    cartList.appendChild(noItemsText);

    selectAllCheckbox.setAttribute('disabled', 'disabled');
    deleteButton.setAttribute('disabled', 'disabled');
    purchaseButton.setAttribute('disabled', 'disabled');
    return;
  }

  hasProducts = false;

  // cartData 배열에서 가져온 상품 정보 렌더링
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // 이미지 정보 가져올 때 상품 _id 추출
    if (key.startsWith('product_')) {
      hasProducts = true;
      const productId = key.replace('product_', '');
      const productData = JSON.parse(localStorage.getItem(key));

      // 로컬 스토리지에서 이미지 URL을 가져옴
      const productImageURL = localStorage.getItem(`productImage_${productId}`);

      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `prod${productId}`;
      checkbox.value = '';
      checkbox.setAttribute('data-product-id', productId);
      checkbox.checked = true;

      checkbox.addEventListener('change', function () {
        updateAllCheckboxes();
        updateOrderSummary();
      });

      const cartitemsInfo = document.createElement('div');
      cartitemsInfo.classList.add('cartitems-info');

      const imgBox = document.createElement('div');
      imgBox.classList.add('img-box');
      const productImg = document.createElement('img');
      productImg.classList.add('product-img');

      productImg.src = productImageURL; // 해당 상품의 이미지 URL 설정
      productImg.alt = 'Product Image'; // 대체 텍스트 설정

      imgBox.appendChild(productImg);

      const itemName = document.createElement('span');
      itemName.classList.add('item-name');
      itemName.textContent = productData[0].name; // 상품 이름 설정

      const itemPrice = document.createElement('span');
      itemPrice.classList.add('item-price');
      itemPrice.innerHTML = `<i class="price">${productData[0].price.toLocaleString()} 원</i>`; // 가격 설정

      const amountOpt = document.createElement('div');
      amountOpt.classList.add('amount-opt');

      const quantityLabel = document.createElement('label');
      quantityLabel.setAttribute('for', 'quantity');
      quantityLabel.textContent = '수량';

      const minusButton = document.createElement('input');
      minusButton.type = 'button';
      minusButton.id = 'minus';
      minusButton.value = '-';

      const quantityInput = document.createElement('input');
      quantityInput.type = 'text';
      quantityInput.id = 'quantity';
      quantityInput.value = productData[0].quantity; // 수량 설정
      quantityInput.size = 1;
      quantityInput.readOnly = true;

      const plusButton = document.createElement('input');
      plusButton.type = 'button';
      plusButton.id = 'plus';
      plusButton.value = '+';

      // - 버튼 클릭 시 수량 감소
      minusButton.addEventListener('click', function () {
        decreaseQuantity(quantityInput);
      });

      // + 버튼 클릭 시 수량 증가
      plusButton.addEventListener('click', function () {
        increaseQuantity(quantityInput);
      });

      // 생성한 요소들을 부모 요소에 추가
      amountOpt.appendChild(quantityLabel);
      amountOpt.appendChild(minusButton);
      amountOpt.appendChild(quantityInput);
      amountOpt.appendChild(plusButton);
      cartitemsInfo.appendChild(itemName);
      cartitemsInfo.appendChild(itemPrice);
      cartitemsInfo.appendChild(amountOpt);
      cartItem.appendChild(checkbox);
      cartItem.appendChild(imgBox);
      cartItem.appendChild(cartitemsInfo);

      cartList.appendChild(cartItem);
    }
  }

  if (hasProducts) {
    selectAllCheckbox.removeAttribute('disabled');
    deleteButton.removeAttribute('disabled');
    purchaseButton.removeAttribute('disabled');
  } else {
    selectAllCheckbox.setAttribute('disabled', 'disabled');
    deleteButton.setAttribute('disabled', 'disabled');
    purchaseButton.setAttribute('disabled', 'disabled');
  }
};

// 상품 수량 증가
function increaseQuantity(inputEl) {
  currentQuantity = parseInt(inputEl.value);
  currentQuantity++;
  inputEl.value = currentQuantity;
  updateOrderSummary();

  return currentQuantity;
}

// 상품 수량 감소
function decreaseQuantity(inputEl) {
  currentQuantity = parseInt(inputEl.value);
  if (currentQuantity > 1) {
    currentQuantity--;
    inputEl.value = currentQuantity;
    updateOrderSummary();
  }
  return currentQuantity;
}

// 전체 선택 체크박스 이벤트
const selectAllCheckbox = document.getElementById('select-all');
selectAllCheckbox.addEventListener('change', function () {
  const cartItems = document.querySelectorAll('.cart-item');
  const isChecked = selectAllCheckbox.checked;

  cartItems.forEach((cartItem) => {
    const checkbox = cartItem.querySelector('input[type="checkbox"]');
    checkbox.checked = isChecked;

    checkbox.addEventListener('change', function () {
      updateAllCheckboxes();
      updateOrderSummary();
    });
  });
  updateOrderSummary();
});

// 삭제 버튼 이벤트
const deleteButton = document.querySelector('.delete-btn');
deleteButton.addEventListener('click', function () {
  if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
    const cartItems = document.querySelectorAll('.cart-item');
    let selectedProducts = [];

    cartItems.forEach((cartItem) => {
      const checkbox = cartItem.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        const productId = checkbox.getAttribute('data-product-id');
        const key = `product_${productId}`;
        const productImageKey = `productImage_${productId}`;

        localStorage.removeItem(key);
        localStorage.removeItem(productImageKey);
        updateBadge();

        selectedProducts.push(cartItem);
      }
    });

    selectedProducts.forEach((cartItem) => {
      cartItem.remove();
    });

    updateOrderSummary();
    renderCartData();
    updateAllCheckboxes();
  }
});

// 주문 금액
function updateOrderSummary() {
  let totalProductPrice = 0;
  let hasProducts = false; // 현재 상품 유무 확인

  // 데이터 가져오기
  const cartItems = document.querySelectorAll('.cart-item');
  cartItems.forEach((cartItem) => {
    const checkbox = cartItem.querySelector('input[type="checkbox"]');

    // 선택된 상품 금액만 합산
    if (checkbox.checked) {
      const productId = checkbox.getAttribute('data-product-id');
      const quantityInput = cartItem.querySelector('input[type="text"]');
      const productInfo = getDataFromLocalStorage(productId);

      if (productInfo) {
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(cartItem.querySelector('.item-price i.price').textContent.replace(/[^\d.-]/g, ''));

        // 각 상품의 총 가격 계산
        let productTotalPrice = price * quantity;
        totalProductPrice += productTotalPrice;

        if (quantity > 0) {
          hasProducts = true;
        }
      }
    }
  });

  // 배송비
  const shippingPrice = hasProducts ? 2500 : 0;

  // 총 결제 금액 계산
  const totalPrice = totalProductPrice + shippingPrice;

  const productTotalElement = document.getElementById('product-total');
  const shippingPriceElement = document.getElementById('shipping-price');
  const totalPriceElement = document.getElementById('total-price');

  productTotalElement.textContent = `${totalProductPrice.toLocaleString()}원`;
  shippingPriceElement.textContent = `${shippingPrice.toLocaleString()}원`;
  totalPriceElement.textContent = `${totalPrice.toLocaleString()}원`;
}

// 구매 버튼 클릭 시, 주문 페이지로 이동
const purchaseButton = document.querySelector('.purchase-btn');
purchaseButton.addEventListener('click', function () {
  if (window.confirm('주문을 계속 진행하시겠습니까?')) {
    //선택한 상품의 상품ID, 수량을 가져오고 url에 넣기//
    function getCheckedProducts() {
      const checkedProducts = [];
      const cartItems = document.querySelectorAll('.cart-item');
      cartItems.forEach((cartItem) => {
        const checkbox = cartItem.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
          const productId = checkbox.getAttribute('data-product-id');
          const quantityInput = cartItem.querySelector('input[type="text"]');
          const quantity = parseInt(quantityInput.value);
          checkedProducts.push({ productId, quantity });
        }
      });
      return checkedProducts;
    }
    const checkedProducts = getCheckedProducts();
    console.log(checkedProducts);

    // URL 파라미터로 상품 정보 추가
    const params = checkedProducts
      .map((product) => `product_id=${product.productId}&quantity=${product.quantity}`)
      .join('&');
    const orderUrl = '/pages/Order?' + params;

    // 주문 페이지로 이동
    window.location.href = orderUrl;
  }
});

function getDataFromLocalStorage(productId) {
  const productKey = `product_${productId}`;
  const productInfo = localStorage.getItem(productKey);

  if (productInfo) {
    return JSON.parse(productInfo);
  } else {
    return null;
  }
}
