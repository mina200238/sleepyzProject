//배너 슬라이드 기능
let currentSlide = 0;
const slides = document.querySelectorAll('.main-banner .slides img');
const totalSlides = slides.length;

// 다음 슬라이드로 전환
document.querySelector('.nextSlide').addEventListener('click', function () {
  currentSlide++;
  if (currentSlide === totalSlides) currentSlide = 0;
  updateSlide();
});

function updateSlide() {
  let offset = -currentSlide * 100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// 자동 슬라이드 기능: 계속 오른쪽으로 움직이도록 변경
let slideInterval = setInterval(function () {
  currentSlide++;
  if (currentSlide === totalSlides) currentSlide = 0;
  updateSlide();
}, 6000);

// 상품 데이터를 가져와서 화면에 출력하는 부분
const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';
const productContainer = document.querySelector('.products-wrap');

function showMainProducts(products) {
  const productsToShow = products.slice(-9).reverse();

  productsToShow.forEach((product) => {
    // 새로운 상품 링크 요소를 생성
    const productLink = document.createElement('a');
    productLink.href = `/product/${product._id}`;
    productLink.classList.add('product-link');

    productLink.addEventListener('click', async (e) => {
      e.preventDefault();
      // 클릭된 상품의 ID를 얻습니다.
      const clickedProductId = product._id;
      window.location.href = `/pages/Product-Info?product_id=${clickedProductId}`;

      // 현재 페이지의 URL에서 "product_id" 매개변수 값을 추출
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('product_id');
      console.log(productId);

      try {
        // 상세 정보를 가져올 때는 async/await를 사용합니다.
        const response = await axios.get(`${BASE_URL}/products/${clickedProductId}`);
        const productDetails = response.data.data; // 상세 정보를 가져온다고 가정
        console.log(productDetails);

        // 가져온 상세 정보를 HTML에 표시합니다.
        const productNameElement = document.querySelector('.prod-name');
        const productPriceElement = document.querySelector('.price');
        const productCountryElement = document.querySelector('.country');
        const productShippingFeeElement = document.querySelector('.shipping-fee');

        productNameElement.textContent = productDetails.name;
        productPriceElement.textContent = `${productDetails.price}원`;

        // 필요한 정보를 가져와서 표시한 후에 원하는 동작을 수행할 수 있습니다.
      } catch (error) {
        console.error('상세 정보를 가져올 수 없습니다:', error);
      }
    });

    // 상품 카드 요소를 생성
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // 이미지 래퍼 요소 생성
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    // 이미지 요소 생성
    const productImage = document.createElement('img');
    productImage.src = product.image_id.thumbnail_url[0];
    productImage.alt = `${product.name} Image`;

    // 상품 정보를 표시하는 요소들 생성 및 설정
    const productName = document.createElement('p');
    productName.textContent = product.name;

    const productPrice = document.createElement('span');
    productPrice.textContent = `${product.price}원`;

    // 상품 카드에 이미지 및 정보 요소 추가
    productCard.appendChild(imageWrapper);
    imageWrapper.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);

    // 상품 링크에 상품 카드 추가
    productLink.appendChild(productCard);

    // 부모 요소에 상품 링크 추가
    productContainer.appendChild(productLink);
  });
}

axios
  .get(`${BASE_URL}/products`)
  .then((response) => {
    const products = response.data.data;
    showMainProducts(products);
  })
  .catch((error) => {
    console.error('데이터를 불러올 수 없습니다:', error);
  });
