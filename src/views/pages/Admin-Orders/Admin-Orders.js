const BASE_URL = 'http://localhost:5000';
const productContainer = document.querySelector('.products-wrap');
const productTable = document.querySelector('.productTable');
let i = 0;
let dropdownCell;
var dropdown;
const ORDERS_PER_PAGE = 3; // 1. 한 페이지에 표시할 주문 수
let currentPage = 1; // 2. 현재 페이지 변수 추가


//4. 스크롤바 적용하고 .slice 랑 페이지 네이션 없애기

//주문 내역 전부 불러오기

function showOrders(orders) {
    const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE); // 3. 페이지 수 계산

    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;

    const ordersToShow = orders.slice(startIndex, endIndex);

    console.log(ordersToShow);
    ordersToShow.forEach((order, index) => {
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

        // 드롭다운 생성 및 추가
        const dropdownCell = document.createElement('td');
        // 새로운 select 요소 생성
        dropdown = document.createElement('select');
        dropdown.className = `options${i}`;
        dropdown.onchange = changeFn;

        let dropdowns = createDropdown(); // createDropdown()의 결과를 변수에 저장

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

        manageTd3.appendChild(deleteButton);
        manageTd.appendChild(manageTd3);


        deleteButton.onclick = function (e) {
            const Id = order._id;
            deleteOrder(Id);
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


function createDropdown() {


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
        .put(`${BASE_URL}/admin/orders`, {
            order_id: Id,
            delivery_status: selectedOption,
        })
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
            order_id: Id,
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

    // 이전 페이지 버튼
    const prevButton = document.createElement('button');
    prevButton.textContent = '이전';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            refreshOrders();
        }
    });
    paginationContainer.appendChild(prevButton);

    // 페이지 번호 버튼
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            refreshOrders();
        });
        paginationContainer.appendChild(pageButton);
    }

    // 다음 페이지 버튼
    const nextButton = document.createElement('button');
    nextButton.textContent = '다음';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            refreshOrders();
        }
    });
    paginationContainer.appendChild(nextButton);
}

// 주문을 다시 표시하는 함수
function refreshOrders() {
    axios
        .get(`${BASE_URL}/admin/orders`)
        .then((response) => {
            const orders = response.data.data;
            productTable.innerHTML = ''; // 테이블 비우기

            showOrders(orders);
        })
        .catch((error) => {
            console.error('데이터를 불러올 수 없습니다:', error);
        });
}

// 초기 주문 표시
axios
    .get(`${BASE_URL}/admin/orders`)
    .then((response) => {
        const orders = response.data.data;
        showOrders(orders);
    })
    .catch((error) => {
        console.error('데이터를 불러올 수 없습니다:', error);
    });