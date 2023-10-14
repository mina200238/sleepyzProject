import { getCart, addToCart } from '/public/utils/CartData.js';
const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';
const quantityInput = document.getElementById('quantity');
let currentQuantity = 1;

// data 가져오는 코드
const getProductInfo = async function () {
  // 실제 서버 데이터 가져오는 코드
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product_id');
  console.log(productId);

  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    const productInfo = response.data.data[0];
    const productInfoArea = document.querySelector('.products-info');
    const imgBox = productInfoArea.querySelector('.img-box');
    const infoBox = productInfoArea.querySelector('.info-box');
    const prodName = infoBox.querySelector('.prod-name');
    const prodPrice = infoBox.querySelector('.prod-price .price');
    const detailInfo = document.querySelector('.detail-info');
    const formattedPrice = productInfo.price.toLocaleString();

    prodName.textContent = productInfo.name;
    prodPrice.textContent = formattedPrice;
    detailInfo.textContent = productInfo.description;

    const productImg = document.createElement('img');
    productImg.src = productInfo.image_id.thumbnail_url[0];
    productImg.alt = `${productInfo.name}-image`;
    imgBox.appendChild(productImg);

    // 상품 상세 페이지 장바구니 담기 버튼
    const addtoCartBtn = document.querySelector('.addtocart-btn');
    // 장바구니 담기 누르면 localstorage에 데이터 추가npm s
    addtoCartBtn.addEventListener('click', async function () {
      addToCart(productInfo, currentQuantity);
    });

    //주문 페이지로 이동하기
    const buyNowbtn = document.querySelector('.purchase-btn');
    buyNowbtn.addEventListener('click', async function () {
      if (window.confirm('주문 작성 페이지로 이동하시겠습니까?')) {
        window.location.href = `/pages/Order/Order.html?product_id=${productId}&quantity=${currentQuantity}`;
      }
    });
  } catch (error) {
    console.error('데이터를 로드할 수 없습니다', error);
  }
};

// 상품 상세 페이지 로드 시, 상품 정보 화면에 표시
window.addEventListener('DOMContentLoaded', getProductInfo);

// 상품 수량 증가
function increaseQuantity() {
  currentQuantity++;
  quantityInput.value = currentQuantity;
}

// 상품 수량 감소
function decreaseQuantity() {
  if (currentQuantity > 1) {
    currentQuantity--;
    quantityInput.value = currentQuantity;
  }
}

// - 버튼 클릭 시 수량 감소
const decreaseButton = document.getElementById('minus');
decreaseButton.addEventListener('click', function () {
  decreaseQuantity();
});

// + 버튼 클릭 시 수량 증가
const increaseButton = document.getElementById('plus');
increaseButton.addEventListener('click', function () {
  increaseQuantity();
});
