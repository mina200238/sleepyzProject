document.addEventListener('DOMContentLoaded', async () => {
  const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';
  function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name + '=') === 0) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return '';
  }
  const access = getCookie('accessToken');
  console.log('2여기', access);
  const myData = await axios.get(`${BASE_URL}/users/userInfo`, {
    headers: {
      authorization: access,
    },
  });
  const beforeData = myData.data.data;
  console.log('3여기', beforeData);

  // URL에서 이메일 파라미터 가져오기
  const userEmail = beforeData.email;

  //주문내역 정보를 서버에서 가져오고 화면에 띄우는 과정
  if (userEmail) {
    try {
      const orderDetails = await fetchOrderDetails(userEmail);
      displayOrderDetails(orderDetails);
    } catch (error) {
      console.error('Error fetching or displaying order details:', error);
    }
  }
});

//주문내역정보 서버에서 가져오기
async function fetchOrderDetails(email) {
  try {
    const response = await axios.get(`http://kdt-sw-6-team06.elicecoding.com/orders/search?email=${email}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
}

//화면에 주문내역정보 띄우기
function displayOrderDetails(orderDetails) {
  console.log('1여기', orderDetails);
  const container = document.querySelector('.order-container');

  //주문내역이 없으면 화면에 '주문내역이 없습니다.'를 띄움
  if (!orderDetails || orderDetails.length < 1) {
    const noOrderMessage = document.createElement('div');
    noOrderMessage.classList.add('no-order-message');
    noOrderMessage.textContent = '주문내역이 없습니다.';
    container.appendChild(noOrderMessage);
    return; // 함수 종료
  }

  //여러 주문내역에 대해 하나씩 화면에 띄움
  orderDetails.forEach((orderInfoList) => {
    console.log('2여기', orderInfoList);

    //총 금액
    let tatalPrice = 0;
    for (let i = 0; i < orderInfoList.products.length; i++) {
      tatalPrice += orderInfoList.products[i][2] * orderInfoList.products[i][3];
    }

    //order-info 클래스의 내용
    const orderInfo = document.createElement('div');
    orderInfo.classList.add('order-info');

    orderInfo.innerHTML = `
      <div class="order-info-list">
        <div>
          <p>주문일자</p>
          <p class="order-info-group">${orderInfoList.createdAt}</p>
        </div>
        <div>
          <p>주문번호</p>
          <p class="order-info-group">${orderInfoList._id}</p>
        </div>
        <div>
          <p>총 금액</p>
          <p class="order-info-group">${tatalPrice}원</p>
        </div>
      </div>
      <div class="delivery-info-list">
        <div>
          <p>받는 사람</p>
          <p class="delivery-info-group">${orderInfoList.receiver_name}</p>
        </div>
        <div>
          <p>전화번호</p>
          <p class="delivery-info-group">${orderInfoList.receiver_phone_number}</p>
        </div>
        <div>
          <p>주소</p>
          <p class="delivery-info-group">${orderInfoList.receiver_address}</p>
        </div>
      </div>
    `;

    //products-info 클래스의 내용
    const productsInfo = document.createElement('div');
    productsInfo.classList.add('products-info');

    productsInfo.innerHTML = `
      <p class="product">상품</p>
      <p class="price">가격</p>
      <p class="quantity">수량</p>
      <p class="delivery">배송상태</p>
    `;

    //order-item 클래스 내용
    const productsInfoHTML = orderInfoList.products
      .map(
        (order) => `
      <div class="order-item">
        <p class="product">${order[1]}</p>
        <p class="price">${order[2]}</p>
        <p class="quantity">${order[3]}</p>
        <p class="delivery">${orderInfoList.delivery_status}</p>
      </div>
    `,
      )
      .join('');

    //만들어놓은 3개의 클래스를 order 클래스에 추가
    const order = document.createElement('div');
    order.classList.add('order');

    order.appendChild(orderInfo);
    order.appendChild(productsInfo);
    order.innerHTML += productsInfoHTML;

    container.appendChild(order);
  });
}

// // 모달을 여는 함수
// function openModal(recipientName, phoneNumber, address) {
//   const modal = document.getElementById('deliveryModal');
//   const recipientNameSpan = document.getElementById('recipientName');
//   const phoneNumberSpan = document.getElementById('phoneNumber');
//   const addressSpan = document.getElementById('address');

//   recipientNameSpan.textContent = recipientName;
//   phoneNumberSpan.textContent = phoneNumber;
//   addressSpan.textContent = address;

//   modal.style.display = 'block';
// }

// // 모달을 닫는 함수
// function closeModal() {
//   const modal = document.getElementById('deliveryModal');
//   modal.style.display = 'none';
// }

// // "상세페이지" 버튼 클릭 시 모달 열기
// document.addEventListener('click', function (event) {
//   if (event.target.classList.contains('order-info-btn') && event.target.textContent === '상세페이지') {
//     const recipientName = '이름'; // 받는 사람 정보를 적절한 방식으로 가져오세요.
//     const phoneNumber = '전화번호'; // 전화번호 정보를 적절한 방식으로 가져오세요.
//     const address = '주소'; // 주소 정보를 적절한 방식으로 가져오세요.
//     openModal(recipientName, phoneNumber, address);
//   }
// });

// // "닫기" 버튼 클릭 시 모달 닫기
// document.getElementById('closeModal').addEventListener('click', closeModal);

// // 화면 클릭 시 모달 닫기 (모달 바깥 클릭 시)
// window.addEventListener('click', function (event) {
//   const modal = document.getElementById('deliveryModal');
//   if (event.target == modal) {
//     closeModal();
//   }
// });
