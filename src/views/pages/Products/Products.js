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
