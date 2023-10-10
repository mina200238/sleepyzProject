import updateBadge from '/public/utils/UpdateBadge.js';

const IndexedDB = {
  dbName: 'shoppingCartDB',
  dbVersion: 1,
  db: null,

  // 데이터 베이스 열고 DB 객체 반환
  async openDatabase() {
    if (this.db) {
      return this.db; // 이미 열려있을 경우 기존 DB 반환
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = function (event) {
        console.error('데이터베이스 생성 실패: ' + event.target.errorCode);
        reject(event.target.error);
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        this.db = db;
        resolve(db);
      }.bind(this);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const store = db.createObjectStore('cart', {
          keyPath: '_id',
        });
      };
    });
  },

  // 이미 존재하는 아이템인지 확인
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

  // 장바구니에 신규 상품 추가 또는 기존 상품 업데이트
  async updateOrAddProduct(productInfo) {
    const db = await this.openDatabase();
    const transaction = db.transaction(['cart'], 'readwrite');
    const store = transaction.objectStore('cart');

    // 이미 있는 데이터인지 검사
    const isExist = await this.checkIsExist(productInfo._id);

    if (isExist) {
      const confirmMsg = '이미 장바구니에 있는 상품입니다. 추가하시겠습니까?';
      if (window.confirm(confirmMsg)) {
        isExist.quantity++;
        store.put(isExist);
        if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
          window.location.href = '/pages/Cart/Cart.html';
        }
      } else {
        alert('취소되었습니다');
      }
    } else {
      productInfo.quantity = 1;
      store.add(productInfo);
    }

    transaction.oncomplete = function (event) {
      // 장바구니 bage 업데이트
      updateBadge(isExist ? isExist.quantity : 1);
      console.log('트랜잭션이 완료되었습니다');

      // 트랜잭션 완료 후, 리다이렉션
      if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
        window.location.href = '/pages/Cart/Cart.html';
      }
    };

    // 트랜잭션 커밋
    transaction.complete();

    transaction.onerror = function (event) {
      console.log('트랜잭션 도중 에러가 발생하였습니다.');
    };
  },
};

export default IndexedDB;
