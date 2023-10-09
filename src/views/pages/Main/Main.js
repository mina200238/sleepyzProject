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

productsToShow.forEach((product) => {
  // 새로운 상품 링크 요소를 생성
  const productLink = document.createElement('a');
  productLink.href = `/Products-Info.html?id=${product._id}`;
  productLink.classList.add('product-link');

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
