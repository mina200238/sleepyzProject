import updateBadge from '/public/utils/updateBadge.js';

async function fetchHeader() {
  try {
    const response = await fetch('/public/Header/Header.html');
    const data = await response.text();
    document.getElementById('header').innerHTML = data;
  } catch (error) {
    console.error('헤더를 가져오는 중 오류가 발생했습니다:', error);
  }
}

fetchHeader();

// 페이지가 로드될 때 실행
window.addEventListener('load', () => {
  updateBadge();
});
