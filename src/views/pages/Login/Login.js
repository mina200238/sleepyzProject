const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';

// 쿠키 설정 함수
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// 쿠키 가져오는 함수
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

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  axios
    .post(`${BASE_URL}/users/login`, { email, password }, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        alert(response.data.message);

        // JWT 토큰을 쿠키에 저장
        setCookie('accessToken', response.data.accessToken, 1);

        // 로그인 후 필요한 동작 수행, 예를 들어 메인 페이지로 이동
        window.location.href = '/pages';
      }
    })
    .catch((error) => {
      console.error(error);
      if (error.response && error.response.status === 400) {
        // BadRequestError 메시지 처리
        alert(error.response.data.message);
      } else if (error.response && error.response.status === 404) {
        // NotFoundError 메시지 처리
        alert(error.response.data.message);
      } else {
        // 예기치 않은 에러 처리
        alert('서버와의 통신 중 예상치 못한 에러가 발생했습니다.');
      }
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const btnLogin = document.querySelector('.login-btn');
  btnLogin.addEventListener('click', async function (e) {
    e.preventDefault();
    login();
    const access = getCookie('accessToken');
    const res = await axios.get(`${BASE_URL}/admin/categories`, {
      headers: {
        authorization: access,
      },
    });
    if (res.status === 200) {
      window.location.href = 'http://kdt-sw-6-team06.elicecoding.com/pages/Admin-Products';
    }
  });
});
