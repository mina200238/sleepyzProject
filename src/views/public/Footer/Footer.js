// footer 모듈 가져오기
async function fetchFooter() {
  try {
    const response = await fetch('/public/Footer/Footer.html');
    const data = await response.text();
    document.getElementById('footer').innerHTML = data;
  } catch (error) {
    console.error('푸터를 가져오는 중 오류가 발생했습니다:', error);
  }
}

fetchFooter();
