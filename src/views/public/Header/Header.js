import { onPageLoad } from '/src/views/public/utils/onPageLoad.js';

// header 모듈 가져오기
fetch('../../public/Header/Header.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('header').innerHTML = data;
  });

// 페이지가 로드될 때 실행
window.addEventListener('load', onPageLoad);
