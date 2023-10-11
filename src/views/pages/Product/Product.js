let currentPage = 1; // 현재 페이지
const itemsPerPage = 9; // 페이지 당 상품 개수
const productContainer = document.querySelector('.products-wrap');
const BASE_URL = 'http://localhost:5000';
function showProductsByPage(pageNumber, products) {
  const startIdx = (pageNumber - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const productsToShow = products.slice(startIdx, endIdx);
  productContainer.innerHTML = ''; // 이전 상품 삭제

  // 각 상품 데이터를 순회하면서 HTML 요소를 동적으로 생성하고 추가
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
    if (product && product.image_id && product.image_id.thumbnail_url && product.image_id.thumbnail_url[0]) {
      productImage.src = product.image_id.thumbnail_url[0];
    } else {
      console.error('상품 이미지 정보가 올바르지 않습니다:', product);
    }
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
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

const categoryMapping = {
  blanket: '이불',
  pillow: '베개',
  bed: '침대',
  cover: '커버',
};
const categoryTitleElement = document.querySelector('.product-list h2');
categoryTitleElement.textContent = categoryMapping[category] || '전체 상품';

//카테고리별 데이터 가져오기 (수정중)
if (category) {
  const categoryNameInKorean = categoryMapping[category];

  axios
    .get(`${BASE_URL}/products/category`, {
      params: {
        category_name: categoryNameInKorean,
      },
    })
    .then((response) => {
      console.log(response.data);
      const productsByCategory = response.data.data;
      showProductsByPage(currentPage, productsByCategory);
    })
    .catch((error) => {
      console.error('카테고리 기반의 상품 데이터를 불러오는데 실패했습니다:', error);
    });
} else {
  // 카테고리 정보가 없으면 전체 상품 데이터를 가져옵니다.
  axios
    .get(`${BASE_URL}/products`)
    .then((response) => {
      const allProducts = response.data.data;

      // 현재 페이지를 1로 설정하고, 전체 상품 데이터를 화면에 표시
      currentPage = 1;
      showProductsByPage(currentPage, allProducts);

      const prevBtn = document.querySelector('.prev-btn');
      const nextBtn = document.querySelector('.next-btn');
      const pageButtons = document.querySelectorAll('.pagination-bar .link');

      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          showProductsByPage(currentPage, allProducts);
        }
      });
      nextBtn.addEventListener('click', () => {
        const maxPages = Math.ceil(allProducts.length / itemsPerPage);
        if (currentPage < maxPages) {
          currentPage++;
          showProductsByPage(currentPage, allProducts);
        }
      });
      pageButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          currentPage = Number(e.target.value);
          showProductsByPage(currentPage, allProducts);
        });
      });
    })
    .catch((error) => {
      console.error('전체 상품 데이터를 불러오는데 실패했습니다:', error);
    });
}
