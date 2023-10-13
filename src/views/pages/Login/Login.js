const BASE_URL = 'http://localhost:5000';

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

// // 로그인 상태 확인 코드
// function getUserInfo() {
//   const refreshToken = getCookie('refreshToken');
//   const accessToken = localStorage.getItem('accessToken');

//   if (!refreshToken || !accessToken) return;

//   axios
//     .get(`${BASE_URL}/users/userInfo`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       withCredentials: true,
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         console.log(response.data);

//         // 유저 정보 화면에 표시 등
//       } else if (response.status === 500) {
//         alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
//       }
//     })
//     .catch((error) => {
//       console.error(error);

//       if (error.response && error.response.status === 401) {
//         // 세션이 만료된 경우, 로컬 쿠키 삭제
//         deleteCookie('refreshToken');

//         alert('세션이 만료되었습니다. 다시 로그인하세요.');

//         window.location.href = '/login';
//       }
//       // 에러 처리, 예를 들어 에러 메시지 표시 등
//     });
// }

document.addEventListener('DOMContentLoaded', function () {
  const btnLogin = document.querySelector('.login-btn');
  btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    login();
  });
});
