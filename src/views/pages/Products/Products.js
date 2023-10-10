let currentPage = 1;
// URI에 Page번호 표시
function updateURI() {
  const currentURL = window.location.href.split('?')[0];
  const newURL = `${currentURL}?page=${currentPage}`;
  window.history.pushState({ page: currentPage }, '', newURL);
}

function getPageFromURI() {
  const params = new URLSearchParams(window.location.search);
  const pageFromURI = parseInt(params.get('page'));
  if (pageFromURI) {
    currentPage = pageFromURI;
  }
}

//페이지네이션 코드
document.addEventListener('DOMContentLoaded', function () {
  const itemsPerPage = 9;
  const products = document.querySelectorAll('.product-card');
  const totalPage = Math.ceil(products.length / itemsPerPage);

  function updateView() {
    products.forEach((product, index) => {
      if (index < currentPage * itemsPerPage && index >= (currentPage - 1) * itemsPerPage) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  document.querySelector('.pagination-bar').addEventListener('click', function (e) {
    if (e.target.classList.contains('link')) {
      currentPage = parseInt(e.target.value);
    } else if (e.target.classList.contains('prev-btn')) {
      if (currentPage > 1) currentPage--;
    } else if (e.target.classList.contains('next-btn')) {
      if (currentPage < totalPage) currentPage++;
    }
    updateView();
    updateURI();
  });

  updateView();
  updateURI();
});

const productContainer = document.querySelector('.products-wrap');
const BASE_URL = 'http://localhost:5000';

axios
  .get(`${BASE_URL}/products`)
  .then((response) => {
    // 서버로부터 데이터를 성공적으로 가져왔을 때 실행되는 부분
    const products = response.data.data; // 서버 응답에서 원하는 데이터를 추출

    // 이후 데이터를 활용한 작업을 수행할 수 있습니다.
    console.log(products);

    // 각 상품 데이터를 순회하면서 HTML 요소를 동적으로 생성하고 추가
    products.forEach((product) => {
      // 새로운 상품 링크 요소를 생성
      const productLink = document.createElement('a');
      productLink.href = `/product-detail.html?id=${product.id}`;
      productLink.classList.add('product-link');

      // 상품 카드 요소를 생성
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      // productCard.setAttribute('data-category', product.category);

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
  })
  .catch((error) => {
    // 요청이 실패했을 때 실행되는 부분
    console.error('데이터를 불러올 수 없습니다:', error);
  });

//필터 구현해야 하는 코드(수정중)

// let currentPage = 1;
// let filteredProducts = [];

// function updateURI() {
//   const currentURL = window.location.href.split('?')[0];
//   const newURL = `${currentURL}?page=${currentPage}`;
//   window.history.pushState({ page: currentPage }, '', newURL);
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const itemsPerPage = 9;
//   let products = Array.from(document.querySelectorAll('.product-card'));
//   let totalPage = Math.ceil(products.length / itemsPerPage);
//   let filteredProducts = Array.from(document.querySelectorAll('.product-card'));

//   products.forEach((product) => (product.style.display = 'block'));

//   function filterProducts(category) {
//     if (category === '전체' || category === 'Products') {
//       products.forEach((product) => (product.style.display = 'block'));
//     } else {
//       products.forEach((product) => {
//         if (product.getAttribute('data-category') === category) {
//           product.style.display = 'block';
//         } else {
//           product.style.display = 'none';
//         }
//       });
//     }
//     filteredProducts = products.filter((product) => product.style.display === 'block');

//     currentPage = 1;
//     totalPage = Math.ceil(filteredProducts.length / itemsPerPage);
//     updateView();
//     updateURI();
//   }
//   function updateView() {
//     products.forEach((product) => (product.style.display = 'none'));

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     filteredProducts.slice(startIndex, endIndex).forEach((product) => {
//       product.style.display = 'block';
//     });
//   }

//   document.querySelector('.pagination-bar').addEventListener('click', function (e) {
//     if (e.target.classList.contains('link')) {
//       currentPage = parseInt(e.target.value);
//     } else if (e.target.classList.contains('prev-btn')) {
//       if (currentPage > 1) currentPage--;
//     } else if (e.target.classList.contains('next-btn')) {
//       if (currentPage < totalPage) currentPage++;
//     }
//     updateView();
//     updateURI();
//   });

//   const categories = document.querySelectorAll('.category-item a');

//   categories.forEach((category) => {
//     category.addEventListener('click', function (event) {
//       event.preventDefault();

//       let currentCategory = this.getAttribute('href').substring(1);
//       filterProducts(currentCategory);
//     });
//   });

//   filterProducts('전체');
// });
