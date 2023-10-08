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
