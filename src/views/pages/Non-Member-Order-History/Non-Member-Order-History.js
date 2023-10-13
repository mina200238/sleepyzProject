const checkBtn = document.querySelector('.check-btn');

let userEmail = null;
checkBtn.addEventListener('click', function () {
  userEmail = document.getElementById('email').value;
  renderHistory(userEmail);
});

async function renderHistory(userEmail) {
  if (userEmail) {
    try {
      const orderDetails = await fetchOrderDetails(userEmail);
      displayOrderDetails(orderDetails);
    } catch (error) {
      console.error('Error fetching or displaying order details:', error);
    }
  }
}

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
