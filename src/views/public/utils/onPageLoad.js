import updateBadge from '/src/views/public/utils/updateBadge.js';

// 페이지가 로드될 때 실행할 함수
export function onPageLoad() {
  // IndexedDB 초기화 및 데이터베이스 생성
  if (window.indexedDB) {
    const dbName = 'shoppingCartDB';
    const dbVersion = 1;
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event) {
      console.error('Database error:' + event.target.errorCode);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore('cart', {
        keyPath: '_id',
      });
    };

    // 요청 성공했을 때
    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(['cart'], 'readonly');
      const store = transaction.objectStore('cart');

      // 모든 상품을 가져와서 상품 개수 계산
      const cartRequest = store.getAll();
      cartRequest.onsuccess = function (event) {
        const cartItems = event.target.result;
        const itemCount = cartItems.reduce(function (total, item) {
          return total + item.quantity;
        }, 0);

        // 장바구니 badge 업데이트
        updateBadge(itemCount);
      };
    };
  }
}
