const orderForm = document.getElementById('order-form');
const purchaseBtn = document.querySelector('.purchase-btn');
//구매하기 버튼 클릭 시 formdata 생성
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
    user_id: '651e69649585d36a1c743e0a',
    products_id: {
      '651e69649585d36a1c743e4g': 2,
      '651e69649585d36a1c743e7d': 1,
    },
    delivery_status: '주문완료',
  });

  const jsonData = JSON.stringify(jsonObject);

  orderForm.reset();
  // axios로 생성한 데이터를 서버로 post 요청을 보냄
  try {
    const res = await axios.post('http://localhost:5000/orders', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('응답 받음:', res.data);
  } catch (err) {
    console.log('에러 발생:', err);
  }
});
