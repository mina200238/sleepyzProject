const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';
const productContainer = document.querySelector('.products-wrap');
const productTable = document.querySelector('.productTable');
let i = 0;
let dropdownCell;
var dropdown;
const ORDERS_PER_PAGE = 5; // 1. 한 페이지에 표시할 주문 수
let currentPage = 1; // 2. 현재 페이지 변수 추가

/// 쿠키 가져오기
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

//4. 스크롤바 적용하고 .slice 랑 페이지 네이션 없애기

//주문 내역 전부 불러오기

function showOrders(orders) {
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE); // 3. 페이지 수 계산

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;

  const ordersToShow = orders.slice(startIndex, endIndex);

  console.log(ordersToShow);

  ordersToShow.forEach((order, index) => {
    if (order.deleted_at) {
      return;
    }

    // if (order.email.length > 6) {
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
        prodouctsIdCellElement.textContent = `${productInfo[1]}, ${productInfo[2].toLocaleString()}원, 개수: ${
          productInfo[3]
        }\n`;
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
      totalprice = totalprice + priceInfo[2] * priceInfo[3];
    });
    priceCellElement.textContent = `${totalprice.toLocaleString()}원`;
    priceCell.appendChild(priceCellElement);

    orderRow.appendChild(priceCell);

    // 드롭다운 생성 및 추가
    const dropdownCell = document.createElement('td');
    // 새로운 select 요소 생성
    dropdown = document.createElement('select');
    dropdown.className = `options${i}`;
    dropdown.onchange = changeFn;

    let dropdowns = createDropdown(order.delivery_status); // createDropdown()의 결과를 변수에 저장

    // dropdown을 dropdownCell에 추가
    dropdownCell.appendChild(dropdowns);

    // createdropdownContainer.id = 'statusDropdown';
    //console.log(createdropdownContainer);
    orderRow.appendChild(dropdownCell);

    var manageTd = document.createElement('td');
    const manageTd2 = document.createElement('div');

    // 수정 버튼 추가
    const manageButton = document.createElement('button');
    manageButton.id = `button${i}`;
    i++;
    manageButton.textContent = '수정';
    manageButton.className = 'btn';
    manageTd2.appendChild(manageButton);
    manageTd.appendChild(manageTd2);

    manageButton.onclick = function (e) {
      const Id = order._id;

      let selectedOption = changeFn.call(e.target, e);

      console.log(selectedOption);
      updateSelectedStatus(selectedOption, Id);
    };

    // 삭제 버튼 추가
    const manageTd3 = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'btn';

    manageTd3.appendChild(deleteButton);
    manageTd.appendChild(manageTd3);

    deleteButton.onclick = function (e) {
      if (confirm('정말 주문을 삭제하시겠습니까?')) {
        const Id = order._id;
        deleteOrder(Id);
        window.location.reload();
      }
    };

    orderRow.appendChild(manageTd);

    productTable.appendChild(orderRow);

    // }
  });
  addPagination(totalPages);
}

// headers: {'authorization': accessToken,}

// axios
//     .get(`${BASE_URL}/admin/orders`)
//     .then((response) => {
//         const orders = response.data.data;
//         showOrders(orders);
//     })
//     .catch((error) => {
//         console.error('데이터를 불러올 수 없습니다:', error);
//     });

function createDropdown(orderDeliveryStatus) {
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

  if (preparing.value === orderDeliveryStatus) {
    preparing.selected = true;
  }

  if (shipping.value === orderDeliveryStatus) {
    shipping.selected = true;
  }

  if (delivered.value === orderDeliveryStatus) {
    delivered.selected = true;
  }

  // 생성한 옵션들을 드롭다운에 추가
  dropdown.appendChild(preparing);
  dropdown.appendChild(shipping);
  dropdown.appendChild(delivered);

  return dropdown;
}

//2.주문 수정하기 함수

function updateSelectedStatus(selectedOption, Id) {
  // 선택된 상태 가져오기
  // const selectedStatus = document.querySelectorAll('#td');
  // console.log(selectedStatus);
  // const sendStatus = selectedStatus.options[selectedStatus.selectedIndex].value;

  // PUT 요청 보내기
  axios
    .put(
      `${BASE_URL}/admin/orders`,
      {
        order_id: Id,
        delivery_status: selectedOption,
      },
      {
        headers: {
          authorization: access,
        },
      },
    )
    .then((response) => {
      // 성공적으로 업데이트되었을 때 처리
      console.log('사용자 정보가 업데이트되었습니다.', response.data);
      alert('사용자 정보가 업데이트되었습니다.');
      return;
    });
}

//3. 주문 삭제하기 함수
function deleteOrder(Id) {
  // DELETE 요청 보내기
  axios
    .delete(`${BASE_URL}/admin/orders`, {
      data: {
        order_id: Id,
      },
      headers: {
        authorization: access,
      },
    })
    .then((response) => {
      // 성공적으로 업데이트되었을 때 처리
      console.log('사용자 정보가 삭제되었습니다.', response.data);
      alert('사용자 정보가 삭제되었습니다.');
      return;
    });
}

function changeFn(event) {
  event.stopPropagation();
  const parentElement = event.target.closest('tr');
  console.log(parentElement);
  const tdElements = Array.from(parentElement.querySelectorAll('td'));

  const selectElement = tdElements[4].querySelector('select');

  const selectedOption = selectElement.value;

  // console.log(selectedOption);
  return selectedOption;
}

// 페이지네이션 함수 추가
function addPagination(totalPages) {
  const paginationContainer = document.querySelector('.pagination');

  // 기존 페이지네이션 버튼 제거
  paginationContainer.innerHTML = '';

  if (totalPages >= 5) {
    // 이전 페이지 버튼
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.className = 'btn';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        refreshOrders();
      }
    });

    paginationContainer.appendChild(prevButton);
  }

  // 페이지 번호 버튼
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      refreshOrders();
    });
    pageButton.className = 'btn';
    paginationContainer.appendChild(pageButton);
  }

  if (totalPages >= 5) {
    // 다음 페이지 버튼
    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.className = 'btn';
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        refreshOrders();
      }
    });
    paginationContainer.appendChild(nextButton);
  }
}

// 주문을 다시 표시하는 함수
function refreshOrders() {
  axios
    .get(`${BASE_URL}/admin/orders`, {
      headers: {
        authorization: access,
      },
    })
    .then((response) => {
      const orders = response.data.data;
      productTable.innerHTML = `
            <tr>
                <th style="width: 5%">번호</th>
                <th style="width: 10%">상품명</th>
                <th style="width: 30%">카테고리</th>
                <th style="width: 5%">가격</th>
                <th style="width: 5%">배송 상태</th>
                <th style="width: 5%">배송 상태 수정</th>
            </tr>
            `; // 테이블 비우기

      showOrders(orders);
    })
    .catch((error) => {
      console.error('데이터를 불러올 수 없습니다:', error);
    });
}

// 초기 주문 표시
axios
  .get(`${BASE_URL}/admin/orders`, {
    headers: {
      authorization: access,
    },
  })
  .then((response) => {
    const orders = response.data.data;
    showOrders(orders);
  })
  .catch((error) => {
    console.error('데이터를 불러올 수 없습니다:', error);
  });
