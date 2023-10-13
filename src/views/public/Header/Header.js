import updateBadge from '/public/utils/UpdateBadge.js';

async function fetchHeader() {
  try {
    const response = await fetch('/public/Header/Header.html');
    const data = await response.text();
    document.getElementById('header').innerHTML = data;

    updateBadge();

    const categoryLinks = document.querySelectorAll('.dropdown a');

    categoryLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const categoryName = event.target.textContent;
        window.location.href = `/pages/Product?category_name=${encodeURIComponent(categoryName)}`;
      });
    });

    // 여기에 로그인 상태를 확인하고 드롭다운 메뉴 변경 로직 추가
    const isLoggedIn = checkUserLoginStatus(); // 로그인 상태 확인 함수 호출
    const dropdown = document.querySelector('.utils-dropdown ul');

    if (isLoggedIn) {
      // 로그인 상태인 경우
      dropdown.innerHTML = `
        <li>
          <a href="/pages/My-Info/">내 정보</a>
        </li>
        <li>
          <a href="/pages/Order-History">
            <img class="order-history-icon" src="/public/assets/icon_order_history.svg" alt="Order History" /> 주문 내역
          </a>
        </li>
        <li>
          <a href="#">로그아웃</a>
        </li>
      `;
      const logoutButton = document.getElementById('logout');
      console.log(logoutButton);
      if (logoutButton) {
        logoutButton.addEventListener('click', function (e) {
          console.log('클릭');
          e.preventDefault();
          localStorage.removeItem('accessToken');
          deleteCookie('refreshToken');
          window.location.href = '/pages';
        });
      }
    } else {
      // 로그아웃 상태인 경우
      dropdown.innerHTML = `
        <li>
          <a href="/pages/Login/">로그인</a>
        </li>
        <li>
          <a href="/pages/Order-History">주문 내역</a>
        </li>
      `;
    }
  } catch (error) {
    console.error('헤더를 가져오는 중 오류가 발생했습니다:', error);
  }
  const logoutButton = document.getElementById('logout');
  console.log(logoutButton);
  if (logoutButton) {
    logoutButton.addEventListener('click', function (e) {
      console.log('클릭');
      e.preventDefault();
      localStorage.removeItem('accessToken');
      deleteCookie('refreshToken');
      window.location.href = '/pages';
    });
  }
}

async function addFavicon() {
  const head = document.querySelector('head');
  // SVG 파비콘 추가
  const faviconSVG = document.createElement('link');
  faviconSVG.rel = 'icon';
  faviconSVG.type = 'image/svg+xml';
  faviconSVG.href = '/public/assets/favicon.svg';
  head.appendChild(faviconSVG);

  // PNG 파비콘 추가
  const faviconPNG = document.createElement('link');
  faviconPNG.rel = 'icon';
  faviconPNG.type = 'image/png';
  faviconPNG.href = '/public/assets/favicon.png';
  head.appendChild(faviconPNG);
}

// 페이지가 로드될 때 실행
window.addEventListener('DOMContentLoaded', () => {
  addFavicon();
  fetchHeader();
});

// 쿠키에서 accessToken을 가져오는 함수
function getAccessTokenFromCookie() {
  const name = 'accessToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

function checkUserLoginStatus() {
  const token = getAccessTokenFromCookie();
  if (!token) {
    return false;
  }
  return true;
}

// document.addEventListener('DOMContentLoaded', function () {
//   const logoutButton = document.getElementById('logout');
//   console.log(logoutButton);

//   if (logoutButton) {
//     logoutButton.addEventListener('click', function (e) {
//       e.preventDefault();

//       localStorage.removeItem('accessToken');

//       deleteCookie('refreshToken');

//       window.location.href = '/pages';
//     });
//   }

//   // 쿠키 삭제 함수
//   function deleteCookie(name) {
//     document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
//   }
// });
