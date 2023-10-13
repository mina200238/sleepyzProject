async function fetchHeader() {
  try {
    const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';
    const response = await fetch('/public/Header/Header.html');
    const data = await response.text();
    document.getElementById('header').innerHTML = data;

    // updateBadge();

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
    console.log('2여기', access);
    const myData = await axios.get(`${BASE_URL}/users/userInfo`, {
      headers: {
        authorization: access,
      },
    });
    const userEmail = mydata.data.data.email;

    if (isLoggedIn) {
      // 로그인 상태인 경우
      dropdown.innerHTML = `
        <li>
          <a href="/pages/My-Info/">내 정보</a>
        </li>
        <li>
          <a href="/pages/Order-History/?email=${userEmail}">
            주문 내역
          </a>
        </li>
        <li class="logout">
          <a href="#">로그아웃</a>
        </li>
      `;
      const logoutButton = document.querySelector('.logout');
      console.log(logoutButton);
      if (logoutButton) {
        console.log('확인');
        logoutButton.addEventListener('click', function (e) {
          console.log('클릭');
          e.preventDefault();
          deleteCookie('accessToken', 'refreshToken');
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
          <a href="/pages/SignUp/">회원가입</a>
        </li>
        <li>
          <a href="/pages/Order-History">주문 내역</a>
        </li>
      `;
    }
  } catch (error) {
    console.error('헤더를 가져오는 중 오류가 발생했습니다:', error);
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

// 로그인 확인
function checkUserLoginStatus() {
  const token = getAccessTokenFromCookie();
  if (!token) {
    return false;
  }
  return true;
}

// 쿠키 삭제 함수
function deleteCookie(...cookieNames) {
  cookieNames.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
  });
}
