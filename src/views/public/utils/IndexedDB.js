import updateBadge from '/src/views/public/utils/UpdateBadge.js';

const IndexedDB = {
  dbName: 'shoppingCartDB',
  dbVersion: 1,
  db: null,

  async openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = function (event) {
        console.error('데이터베이스 생성 실패: ' + event.target.errorCode);
        reject(event.target.error);
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        resolve(db);
      };

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const store = db.createObjectStore('cart', {
          keyPath: '_id',
        });
      };
    });
  },

  async checkIsExist(id) {
    const db = await this.openDatabase();
    const transaction = db.transaction(['cart'], 'readonly');
    const store = transaction.objectStore('cart');

    return new Promise((resolve, reject) => {
      const getRequest = store.get(id);

      getRequest.onsuccess = function (event) {
        const result = event.target.result;
        resolve(result);
      };

      getRequest.onerror = function (event) {
        console.error('데이터 불러오기 실패: ', event.target.error);
        reject(event.target.error);
      };
    });
  },

  async updateOrAddproduct(productInfo) {
    const db = await this.openDatabase();
    const transaction = db.transaction(['cart'], 'readwrite');
    const store = transaction.objectStore('cart');

    // 이미 있는 데이터인지 검사
    const isExist = await this.checkIsExist([productInfo._id]);

    if (isExist) {
      const confirmMsg = '이미 장바구니에 있는 상품입니다. 추가하시겠습니까?';
      if (window.confirm(confirmMsg)) {
        result.quantity++;
        store.put(result);
        if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
          window.location.href = '/src/views/pages/Cart/Cart.html';
        }
      } else {
        alert('취소되었습니다');
      }
    } else {
      data.quantity = 1;
      store.add(data);
      if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
        window.location.href = '/src/views/pages/Cart/Cart.html';
      }
    }
    // 장바구니 bage 업데이트
    updateBadge(result ? result.quantity : 1);

    transaction.oncomplete = function (event) {
      console.log('트랜잭션이 완료되었습니다');
    };

    transaction.onerror = function (event) {
      console.log('트랜잭션 도중 에러가 발생하였습니다.');
    };
  },
};

export default IndexedDB;
