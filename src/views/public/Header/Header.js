// 헤더 영역 클릭시에 물품 필터 JS//
fetch('../../public/Header/Header.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('header').innerHTML = data;

    const categoryLinks = document.querySelectorAll('.categoryItem a');
    const products = document.querySelectorAll('.product-link');

    categoryLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedCategory = e.target.getAttribute('href').slice(1);

        products.forEach((product) => {
          if (
            product.getAttribute('data-category') === selectedCategory ||
            selectedCategory === 'all'
          ) {
            product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
        });
      });
    });
  });

////////////////////////////////// cart badge 업데이트용 indexeddb //////////////////////////////////

// 페이지가 로드될 때 실행할 함수
function onPageLoad() {
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

// 페이지가 로드될 때 실행
window.addEventListener('load', onPageLoad);

// 장바구니 아이콘 badge 숫자 업데이트
function updateBadge(itemCount) {
  const badgeElement = document.getElementById('cartBadge');
  if (badgeElement) {
    badgeElement.textContent = itemCount.toString();
  }
}

////////////////////////////////// cart badge 업데이트용 indexeddb //////////////////////////////////
