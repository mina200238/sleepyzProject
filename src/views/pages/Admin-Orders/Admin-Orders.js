const BASE_URL = 'http://localhost:5000';
const productContainer = document.querySelector('.products-wrap');
const productTable = document.querySelector('.productTable');

//4. 스크롤바 적용하고 .slice 랑 페이지 네이션 없애기

//주문 내역 전부 불러오기

function showOrders(orders) {
  let manageButton;
  // console.log(orders);
  const ordersToShow = orders.slice(0, orders.length);
  console.log(ordersToShow);

  ordersToShow.forEach((order, index) => {
    if (order.email.length > 6) {
      const orderRow = document.createElement('tr');
      // 번호 추가
      const numberCell = document.createElement('td');
      numberCell.textContent = index + 1;
      orderRow.appendChild(numberCell);

      //주문자정보 추가
      const userIdCell = document.createElement('td');
      if (order.name) {
        userIdCell.textContent = `${order.name}\n${order.email}`;
      } else {
        userIdCell.textContent = `비회원\n 이메일: ${order.email}`;
      }

      orderRow.appendChild(userIdCell);

      //상품 정보 추가
      const productInfoCell = document.createElement('td');

      order.products.forEach((productInfo) => {
        const prodouctsIdCellElement = document.createElement('div');
        if (productInfo) {
          prodouctsIdCellElement.textContent = `상품명: ${productInfo[1]}, 개수: ${productInfo[3]}\n`;
          productInfoCell.appendChild(prodouctsIdCellElement);
        } else {
          prodouctsIdCellElement.textContent = `품절된 상품입니다`;
        }
      });

      orderRow.appendChild(productInfoCell);

      //결제 정보 추가
      const priceCell = document.createElement('td');
      let totalprice = 0;
      const priceCellElement = document.createElement('div');
      order.products.forEach((priceInfo) => {
        totalprice += Number(priceInfo[2]);
      });
      priceCellElement.textContent = `총 구매 가격: ${totalprice}\n`;
      priceCell.appendChild(priceCellElement);

      orderRow.appendChild(priceCell);

      // createdropdownContainer.id = 'statusDropdown';
      //console.log(createdropdownContainer);
      orderRow.appendChild(dropdownCell);

      var manageTd = document.createElement('td');
      const manageTd2 = document.createElement('div');

      // //버튼 클릭 시 , PUT요청하는 함수 호출
      manageButton.onclick = () => updateSelectedStatus(order._id);

      //드롭다운 생성 및 추가
      dropdownCell = document.createElement('td');
      createDropdown();

      // 수정 버튼 추가
      manageButton = document.createElement('button');
      manageButton.textContent = '수정';
      manageTd2.appendChild(manageButton);
      manageTd.appendChild(manageTd2);

      // 삭제 버튼 추가
      const manageTd3 = document.createElement('div');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '삭제';

      manageTd3.appendChild(deleteButton);
      manageTd.appendChild(manageTd3);

      orderRow.appendChild(manageTd);

      productTable.appendChild(orderRow);
    }
  });
}

// headers: {'authorization': accessToken,}

axios
  .get(`${BASE_URL}/admin/orders`)
  .then((response) => {
    const orders = response.data.data;
    showOrders(orders);
  })
  .catch((error) => {
    console.error('데이터를 불러올 수 없습니다:', error);
  });

function createDropdown(createdropdownContainer) {
  // const selectedStatus = document.getElementById('statusDropdown')
  //   const dropdownCell = document.createElement('td');

  // 새로운 select 요소 생성
  const dropdown = document.createElement('select');
  dropdown.id = 'options';

  function changeFn() {
    console.log('옵션 변경: ' + dropdown.value);
  }
  dropdown.onchange = changeFn();

  // 드롭다운에 추가할 옵션들을 직접 생성
  const preparing = document.createElement('option');
  preparing.value = '준비중';
  preparing.text = '준비중';

  const shipping = document.createElement('option');
  shipping.value = '배송중';
  shipping.text = '배송중';

  const delivered = document.createElement('option');
  delivered.value = '배송 완료';
  delivered.text = '배송 완료';

  // 생성한 옵션들을 드롭다운에 추가
  dropdown.appendChild(preparing);
  dropdown.appendChild(shipping);
  dropdown.appendChild(delivered);

  // 생성한 드롭다운을 페이지에 추가
  container.appendChild(dropdown);
}

//2.주문 수정하기 함수

function updateSelectedStatus() {
  // 선택된 상태 가져오기
  const selectedStatus = document.getElementsByTagName('option');
  const sendStatus = selectedStatus.value;
  console.log(sendStatus);

  // PUT 요청 보내기
  axios
    .put(`${BASE_URL}/admin/orders`, {
      order_id: order._id,
      delivery_status: sendStatus,
    })
    .then((response) => {
      // 성공적으로 업데이트되었을 때 처리
      console.log('사용자 정보가 업데이트되었습니다.', response.data);
      alert('사용자 정보가 업데이트되었습니다.');
      return;
    });
}
