const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com/';
const productContainer = document.querySelector('.products-wrap');
const productTable = document.querySelector('.productTable');

//주문 내역 전부 불러오기

function showOrders(orders) {
  // console.log(orders);
  const ordersToShow = orders.slice(orders.length - 9, orders.length); //6개의 주문내역 보여주기
  console.log(ordersToShow);

  ordersToShow.forEach((order, index) => {
    const orderRow = document.createElement('tr');
    // 번호 추가
    const numberCell = document.createElement('td');
    numberCell.textContent = index + 1;
    orderRow.appendChild(numberCell);

    //주문자정보 추가
    const userIdCell = document.createElement('td');
    userIdCell.textContent = `${order.name}\n${order.email}`;
    orderRow.appendChild(userIdCell);

    //상품 정보 추가 (에러나는 부분)
    const productInfoCell = document.createElement('td');

    //받아온 products_id의 key값을

    for (let [key, value] of Object.entries(order.products_id)) {
      const prodouctsIdCellElement = document.createElement('div');
      // axios 요청을 비동기적으로 처리
      console.log(key);
      axios
        .get(`${BASE_URL}/products/${key}`)
        .then((response) => {
          const productInfo = response.data.data;
          // 비동기 작업이 완료된 후에 셀에 내용 추가
          if (productInfo) {
            prodouctsIdCellElement.textContent = `상품명: ${productInfo.name}, 개수: ${value}\n`;
            productInfoCell += prodouctsIdCellElement;
            orderRow.appendChild(productInfoCell);
          } else {
            prodouctsIdCellElement.textContent = `품절된 상품입니다`;
          }
        })
        .catch((error) => {
          console.error('데이터를 불러올 수 없습니다:', error);
        });
    }

    //결제 정보 추가도 상품 정보 추가와 비슷함
    const priceCell = document.createElement('td');
    priceCell.textContent = '미해결';
    orderRow.appendChild(priceCell);
  });
}

// headers: {
//     'authorization': accessToken,
// }

axios
  .get(`${BASE_URL}/admin/orders`)
  .then((response) => {
    const orders = response.data.data;
    showOrders(orders);
    updateStatus(orders);
  })
  .catch((error) => {
    console.error('데이터를 불러올 수 없습니다:', error);
  });

// //2.주문 수정하기

// function updateSelectedStatus() {
//     // 선택된 상태 가져오기
//     const selectedStatus = document.getElementById('statusDropdown').value;

//     // 업데이트할 order_id와 새로운 정보
//     const updatedUserData = {
//         : '새로운 이름',
//         email: 'newemail@example.com',
//     };

// // PUT 요청 보내기
// axios.put(`https://api.example.com/users/${userId}`, updatedUserData)
//     .then(response => {
//         // 성공적으로 업데이트되었을 때 처리
//         console.log('사용자 정보가 업데이트되었습니다.', response.data);
//     })
//     .catch(error => {
//         // 에러가 발생했을 때 처리
//         console.error('사용자 정보 업데이트 중 에러 발생: ', error);
//     });
// }

// //3. 주문 삭제하기
