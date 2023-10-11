// import { getCart, saveCart, addToCart } from '/public/utils/CartData.js';

const BASE_URL = 'http://localhost:5000';
let currentQuantity = 1;

// 상품이 하나라도 존재하는지 여부
let hasProducts = false;

const renderCartData = function () {
  // 화면에 데이터 렌더링하는 코드
  const cartList = document.querySelector('.cart-list');
  // 기존 상품 목록 초기화
  cartList.innerHTML = '';

  // 만약 로컬 스토리지에 아무 상품도 없다면 "장바구니에 담긴 상품이 없습니다" 텍스트 추가
  if (localStorage.length === 0) {
    const noItemsText = document.createElement('p');
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
    console.log(key);

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
// 페이지 로드 시, 장바구니 데이터 가져와서 화면에 렌더링
window.addEventListener('DOMContentLoaded', function () {
  renderCartData();
  updateOrderSummary();

  return currentQuantity;
});

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

// 모두 선택 체크박스에 대한 이벤트 리스너
const selectAllCheckbox = document.getElementById('select-all');
selectAllCheckbox.addEventListener('change', function () {
  const cartItems = document.querySelectorAll('.cart-item');
  const isChecked = selectAllCheckbox.checked;

  cartItems.forEach((cartItem) => {
    const checkbox = cartItem.querySelector('input[type="checkbox"]');
    checkbox.checked = isChecked;
  });
});

// 삭제 버튼에 대한 이벤트 리스너
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

        // 해당 상품 정보와 이미지 정보를 로컬 스토리지에서 삭제
        localStorage.removeItem(key);
        localStorage.removeItem(productImageKey);

        // 선택된 상품 목록에 추가
        selectedProducts.push(cartItem);
      }
    });

    // 선택된 상품 삭제
    selectedProducts.forEach((cartItem) => {
      cartItem.remove();
    });

    // 삭제 후 주문 요약을 업데이트
    updateOrderSummary();
    renderCartData();
  }
});

// 주문 금액
function updateOrderSummary() {
  let totalProductPrice = 0;
  let hasProducts = false; // 현재 상품 유무 확인

  // 데이터 가져오기
  const cartItems = document.querySelectorAll('.cart-item');
  cartItems.forEach((cartItem) => {
    const productId = cartItem.getAttribute('data-product-id');
    const quantityInput = cartItem.querySelector('input[type="text"]');
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(cartItem.querySelector('.item-price i.price').textContent.replace(/[^\d.-]/g, ''));

    // 각 상품의 총 가격 계산
    let productTotalPrice = price * quantity;
    totalProductPrice += productTotalPrice;

    if (quantity > 0) {
      hasProducts = true; // 수량이 1 이상인 상품이 있을 경우
    }
  });

  // 배송비
  const shippingPrice = hasProducts ? 2500 : 0;

  // 총 주문 금액 계산
  const totalPrice = totalProductPrice + shippingPrice;

  // 요소 가져오기
  const productTotalElement = document.getElementById('product-total');
  const shippingPriceElement = document.getElementById('shipping-price');
  const totalPriceElement = document.getElementById('total-price');

  // 데이터 삽입
  productTotalElement.textContent = `${totalProductPrice.toLocaleString()}원`;
  shippingPriceElement.textContent = `${shippingPrice.toLocaleString()}원`;
  totalPriceElement.textContent = `${totalPrice.toLocaleString()}원`;
}

// 구매 버튼 클릭 시, 주문 페이지로 이동
const purchaseButton = document.querySelector('.purchase-btn');
purchaseButton.addEventListener('click', function () {
  // 구매 프로세스 실행
  if (window.confirm('주문을 계속 진행하시겠습니까?')) {
    window.location.href = '/pages/Order/Order.html';
  }
});
