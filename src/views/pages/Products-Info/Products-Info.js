import IndexedDB from '/src/views/public/utils/IndexedDB.js';
const BASE_URL = 'http://localhost:5000';

// data 가져오는 코드
const getProductInfo = async function () {
  // 실제 서버 데이터 가져오는 코드
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product_id');

  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    const productInfo = response.data.data[0];

    console.log('상품 상세:', productInfo);

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
  } catch (error) {
    console.error('데이터를 로드할 수 없습니다', error);
  }
};

window.addEventListener('DOMContentLoaded', getProductInfo);

async function getProductData(productId) {
  const BASE_URL = 'http://localhost:5000';

  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    const productInfo = response.data.data[0];
    return productInfo;
  } catch (error) {
    console.error('오류로 인해 상품 데이터를 가져오지 못했습니다', error);
    throw error;
  }
}

// 상품 상세 장바구니 담기 버튼
const addtoCartBtn = document.querySelector('.addtocart-btn');
// 장바구니 담기 누르면 indexedDB에 데이터 추가
addtoCartBtn.addEventListener('click', async function () {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');
    const product = await getProductData(productId);
    console.log(product);
    saveProductToIndexedDB(product);
  } catch (error) {
    console.error('장바구니 담기 동작 중 오류 발생', error);
  }
});

// 데이터를 IndexedDB에 저장하는 함수
async function saveProductToIndexedDB(productData) {
  try {
    // 이미 있는 데이터인지 검사
    const isExist = await IndexedDB.checkIsExist(productData._id);
    console.log(productData._id);
    if (isExist) {
      // 이미 장바구니에 있는 경우 업데이트
      const confirmMsg = '이미 장바구니에 있는 상품입니다. 추가하시겠습니까?';
      if (window.confirm(confirmMsg)) {
        isExist.quantity++;
        await IndexedDB.updateOrAddProduct(isExist);
        if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
          window.location.href = '/src/views/pages/Cart/Cart.html';
        }
      } else {
        alert('취소되었습니다');
      }
    } else {
      // 새로운 상품 추가
      productData.quantity = 1;
      await IndexedDB.updateOrAddProduct(productData);
      if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
        window.location.href = '/src/views/pages/Cart/Cart.html';
      }
    }
  } catch (error) {
    console.error('IndexedDB에 데이터를 저장하는 중 오류 발생:', error);
  }
}

// // 비회원일 때
// function addToLocalStorageCart(product) {
//   const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
//   localStorageCart.push(product);
//   localStorage.setItem('cart', JSON.stringify(localStorageCart));
// }

// // 비회원 장바구니에서 상품 가져오기
// function getLocalStorageCart() {
//   return JSON.parse(localStorage.getItem('cart')) || [];
// }
