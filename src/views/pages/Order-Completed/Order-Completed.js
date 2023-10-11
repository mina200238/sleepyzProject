function checkOrder() {
  alert('주문내역 확인 페이지로 이동합니다.');
}

function continueShopping() {
  alert('쇼핑을 계속합니다.');
  window.location.href = '/pages/Products/Products.html';
}

//주문페이지에서 구매하기 버튼을 누르고 url에 전달한 order_id를 가져와서 화면에 띄우기
// 현재 URL 가져오기
const urlParams = new URLSearchParams(window.location.search);
// 원하는 쿼리 매개변수 가져오기
const myParam = urlParams.get('order_id');
// HTML 요소에 추가하기
const myElement = document.getElementById('order_id');
myElement.innerText = `${myParam}`;

//쇼핑계속하기 누르면 전체상품페이지로 넘어가게 만들기
