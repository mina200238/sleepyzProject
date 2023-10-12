import updateBadge from '/public/utils/UpdateBadge.js';

async function fetchHeader() {
  try {
    const response = await fetch('/public/Header/Header.html');
    const data = await response.text();
    document.getElementById('header').innerHTML = data;

    updateBadge();

    const categoryLinks = document.querySelectorAll('.dropdown a');

    categoryLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const categoryName = event.target.textContent;
<<<<<<< HEAD
        window.location.href = `/pages/Product?category_name=${encodeURIComponent(categoryName)}`;
=======
        window.location.href = `/pages/Product/Product.html?category=${encodeURIComponent(categoryName)}`;
>>>>>>> 7f5882f7ab76a272a6f7e85bb923b8b7a8a8f88e
      });
    });
  } catch (error) {
    console.error('헤더를 가져오는 중 오류가 발생했습니다:', error);
  }
}

async function addFavicon() {
  const head = document.querySelector('head');
  // SVG 파비콘 추가
  const faviconSVG = document.createElement('link');
  faviconSVG.rel = 'icon';
  faviconSVG.type = 'image/svg+xml';
  faviconSVG.href = '/public/assets/favicon.svg';
  head.appendChild(faviconSVG);

  // PNG 파비콘 추가
  const faviconPNG = document.createElement('link');
  faviconPNG.rel = 'icon';
  faviconPNG.type = 'image/png';
  faviconPNG.href = '/public/assets/favicon.png';
  head.appendChild(faviconPNG);
}

// 페이지가 로드될 때 실행
window.addEventListener('DOMContentLoaded', () => {
  addFavicon();
  fetchHeader();
});
