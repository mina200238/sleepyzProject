//const mockData = require(../../../static/fakeData.json);

//const products = mockData.products;

fetch('../../public/Header/Header.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('header').innerHTML = data;
  });

// footer 모듈 가져오기
fetch('../../public/Footer/Footer.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('footer').innerHTML = data;
  });
