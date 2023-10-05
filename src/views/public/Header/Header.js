// 헤더 영역 클릭시에 물품 필터 JS//
fetch('../../public/Header/Header.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('header').innerHTML = data;

    const categoryLinks = document.querySelectorAll('.categoryItem a');
    const products = document.querySelectorAll('.product-link');

    categoryLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedCategory = e.target.getAttribute('href').slice(1);

        products.forEach((product) => {
          if (
            product.getAttribute('data-category') === selectedCategory ||
            selectedCategory === 'all'
          ) {
            product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
        });
      });
    });
  });
