// header 모듈 가져오기
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

/////////////////////////////////////////////////////////////////

const prodData = {
  _id: '651e69649585d36a1c743e3h',
  name: '상품2',
  description: '상품 정보',
  price: 1000,
  quantity: 0,
  category: 2,
  image_id: 143,
  created_at: '2023-10-04T14:30:00Z',
  updated_at: '2023-10-04T14:30:00Z',
  deleted_at: '2023-10-04T14:30:00Z',
};

// 상품 상세 장바구니 담기 버튼
const addtoCartBtn = document.querySelector('.addtoCartBtn');
// 장바구니 담기 누르면 indexedDB에 데이터 추가
addtoCartBtn.addEventListener('click', function () {
  // IndexedDB 초기화 및 데이터베이스 생성

  if (window.indexedDB) {
    const dbName = 'shoppingCartDB';
    const dbVersion = 1;
    const data = prodData;
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event) {
      console.error('Database error:' + event.target.errorCode);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const store = db.createObjectStore('cart', {
        keyPath: '_id',
      });
    };

    // 요청 성공했을 때
    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(['cart'], 'readwrite');
      const store = transaction.objectStore('cart');

      // 이미 있는 데이터인지 검사
      const isExist = store.get(data._id);

      isExist.onsuccess = function (event) {
        const result = event.target.result;
        if (result) {
          const confirmMsg =
            '이미 장바구니에 있는 상품입니다. 추가하시겠습니까?';
          if (window.confirm(confirmMsg)) {
            result.quantity++;
            store.put(result);
            alert('장바구니에 상품이 추가되었습니다');
          } else {
            alert('취소되었습니다');
          }
        } else {
          data.quantity = 1;
          store.add(data);
          alert('장바구니에 상품이 추가되었습니다');
        }
        // 장바구니 bage 업데이트
        updateBadge(result ? result.quantity : 1);
      };

      // 중복되지 않는 데이터만 'products' 저장소에 추가

      transaction.oncomplete = function (event) {
        console.log('트랜잭션이 완료되었습니다');
      };

      transaction.onerror = function (event) {
        console.log('트랜잭션 도중 에러가 발생하였습니다.');
      };
    };
  }
});

// // 비회원일 때
// function addToLocalStorageCart(product) {
//   const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
//   localStorageCart.push(product);
//   localStorage.setItem('cart', JSON.stringify(localStorageCart));
// }

// // 비회원 장바구니에서 상품 가져오기
// function getLocalStorageCart() {
//   return JSON.parse(localStorage.getItem('cart')) || [];
// }

// 장바구니 아이콘 badge 숫자 업데이트
function updateBadge(itemCount) {
  const badgeElement = document.getElementById('cartBadge'); // badge 엘리먼트에 id를 추가해야 합니다.
  if (badgeElement) {
    badgeElement.textContent = itemCount.toString();
  }
}

// 장바구니 아이템 총 수량 indexedDB에서 가져오기

// 초기 페이지 로드 시 아이템 수 업데이트
