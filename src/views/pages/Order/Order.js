//URL에서 상품ID, 갯수 쿼리파라미터 가져오기
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product_id');
const quantity = urlParams.get('quantity');

//주문 내역부분의 총상품금액, 결제금액을 서버에서 가져와서 화면에 띄움
insertPriceElement();

async function insertPriceElement() {
  const totalProductsPrice = document.getElementById('total-products-price');
  const amountOfPayment = document.getElementById('amount-of-payment');
  const res = await axios.get(`http://localhost:5000/products/${productId}`);

  const price = res.data.data[0].price;

  totalProductsPrice.textContent = `${price * quantity}원`;
  amountOfPayment.textContent = `${price * quantity + 2500}원`;
}

//'주문자와 동일하게' 버튼 클릭 시 주문자쪽 input 값이 배송지쪽 input에 자동으로 입력됨
const sameOrdererBtn = document.querySelector('.same-orderer-btn');

sameOrdererBtn.addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const phoneNumber = document.getElementById('phone_number').value;
  const address = document.getElementById('address').value;

  document.getElementById('receiver_name').value = name;
  document.getElementById('receiver_phone_number').value = phoneNumber;
  document.getElementById('receiver_address').value = address;
});

//구매하기 버튼 클릭 시 formdata 생성
const purchaseBtn = document.querySelector('.purchase-btn');
const orderForm = document.getElementById('order-form');

purchaseBtn.addEventListener('click', async function (e) {
  e.preventDefault();

  const formData = new FormData(orderForm);

  let jsonObject = {};

  // FormData의 각 키-값 쌍을 JavaScript 객체에 추가
  formData.forEach(function (value, key) {
    jsonObject[key] = value;
  });

  // 서버에서 받아오거나 직접 작정해야하는 데이터 추가(나중에 id값들은 서버에서 받아와야 함)
  Object.assign(jsonObject, {
    //회원일때는 회원id, 비회원일때는 비회원으로 표시
    user_id: '비회원',
    //상세페이지의 상품과 갯수
    products_id: {
      productId: quantity,
    },
    delivery_status: '주문완료',
  });

  const jsonData = JSON.stringify(jsonObject);

  // console.log(jsonData); //지울부분

  // axios로 생성한 데이터를 서버로 post 요청을 보냄
  try {
    const res = await axios.post('http://localhost:5000/orders', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('응답 받음:', res.data);
    //상품 구매를 최종적으로 확인하는 창을 띄움
    if (confirm('상품을 구매하시겠습니까?')) {
      alert('구매가 완료되었습니다!');
      //post 요청의 res로 받은 order_id를 다음 페이지인 주문완료페이지로 전달하기(url 사용)
      window.location.href = `/pages/Order-Completed/Order-Completed.html?order_id=${res.data.data.order_id}`;
    } else {
      alert('구매가 취소되었습니다.');
    }
  } catch (err) {
    console.log('에러 발생:', err);
  }
});
