// footer 모듈 가져오기
fetch('/public/Footer/Footer.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('footer').innerHTML = data;
  });
