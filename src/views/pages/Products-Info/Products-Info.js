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

// 장바구니 아이콘 badge 숫자 업데이트
function updateBadge(itemCount) {
  const badgeElement = document.getElementById('cartBadge');
  if (badgeElement) {
    badgeElement.textContent = itemCount.toString();
  }
}

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
            if (
              window.confirm(
                '장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?',
              )
            ) {
              window.location.href = '/src/views/pages/Cart/Cart.html';
            }
          } else {
            alert('취소되었습니다');
          }
        } else {
          data.quantity = 1;
          store.add(data);
          if (
            window.confirm(
              '장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?',
            )
          ) {
            window.location.href = '/src/views/pages/Cart/Cart.html';
          }
        }
        // 장바구니 bage 업데이트
        updateBadge(result ? result.quantity : 1);
      };

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

// 모듈화
function createIndexedDB(dbName, dbVersion, objectStore, cb) {
  if (window.indexedDB) {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = function () {
      request.result.createObjectStore(objectStore, { keyPath: '_id' });
    };
    request.onsuccess = function () {
      cb();
    };
  }
}

function insertIndexedDB(dbName, dbVersion, objectStore, data, cb) {
  if (window.indexedDB) {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = function () {
      const store = request.result
        .transaction(objectStore, 'readwrite')
        .objectStore(objectStore);

      store.add(data).onsuccess = function () {
        cb();
      };
    };
  }
}

function getAllIndexedDB(dbName, dbVersion, objectStore, cb) {
  if (window.indexedDB) {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = function () {
      const store = request.result
        .transaction(objectStore, 'readwrite')
        .objectStore(objectStore);

      store.getAll().onsuccess = function (e) {
        cb(e.target.result);
      };
    };
  }
}

function main() {
  const addtoCartBtn = document.querySelector('.addtoCartBtn');
  addtoCartBtn.addEventListener('click');
}
