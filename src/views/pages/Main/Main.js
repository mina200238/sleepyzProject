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
}, 3000);
