import updateBadge from '/public/utils/UpdateBadge.js';

// 페이지가 로드될 때 실행
window.addEventListener('load', () => {
  fetchHeader();
  updateBadge();
});

async function fetchHeader() {
  try {
    const response = await fetch('/public/Header/Header.html');
    const data = await response.text();
    document.getElementById('header').innerHTML = data;

    const categoryLinks = document.querySelectorAll('.dropdown a');

    categoryLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const categoryName = event.target.textContent;
        window.location.href = `/pages/Products/Products.html?category=${encodeURIComponent(categoryName)}`;
      });
    });
  } catch (error) {
    console.error('헤더를 가져오는 중 오류가 발생했습니다:', error);
  }
}
