document.addEventListener('DOMContentLoaded', function () {
  const itemsPerPage = 9;
  let currentPage = 1;
  const products = document.querySelectorAll('.product-card');
  const totalPage = Math.ceil(products.length / itemsPerPage);

  function updateView() {
    products.forEach((product, index) => {
      if (
        index < currentPage * itemsPerPage &&
        index >= (currentPage - 1) * itemsPerPage
      ) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  document
    .querySelector('.pagination-bar')
    .addEventListener('click', function (e) {
      if (e.target.classList.contains('link')) {
        currentPage = parseInt(e.target.value);
      } else if (e.target.classList.contains('prev-btn')) {
        if (currentPage > 1) currentPage--;
      } else if (e.target.classList.contains('next-btn')) {
        if (currentPage < totalPage) currentPage++;
      }
      updateView();
    });

  updateView();
});
