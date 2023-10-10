//배너 슬라이드 기능
let currentSlide = 0;
const slides = document.querySelectorAll('.main-banner .slides img');
const totalSlides = slides.length;

document.querySelector('.nextSlide').addEventListener('click', function () {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

document.querySelector('.prevSlide').addEventListener('click', function () {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

function updateSlide() {
  let offset = -currentSlide * 100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// 자동 슬라이드 기능
let slideInterval = setInterval(function () {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}, 6000);

// 상품 데이터를 가져와서 화면에 출력하는 부분
const BASE_URL = 'http://localhost:5000';
const productContainer = document.querySelector('.products-wrap');

function showMainProducts(products) {
  const productsToShow = products.slice(0, 9);

  productsToShow.forEach((product) => {
    const productLink = document.createElement('a');
    productLink.href = `/Products-Info.html?id=${product._id}`;
    productLink.classList.add('product-link');

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    const productImage = document.createElement('img');
    productImage.src = product.image_id.thumbnail_url[0];
    productImage.alt = `${product.name} Image`;

    const productName = document.createElement('p');
    productName.textContent = product.name;

    const productPrice = document.createElement('span');
    productPrice.textContent = `${product.price}원`;

    productCard.appendChild(imageWrapper);
    imageWrapper.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);

    productLink.appendChild(productCard);
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
