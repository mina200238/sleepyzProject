const BASE_URL = 'http://localhost:5000';

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  axios
    .post(`${BASE_URL}/users/login`, { email, password }, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        console.log(response.data.message);
        console.log(response.message);
        alert('로그인 성공');

        // JWT 토큰 저장:
        localStorage.setItem('accessToken', response.data.accessToken);

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

// // 쿠키를 가져오는 함수
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// // 쿠키를 삭제하는 함수
// function deleteCookie(name) {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

document.querySelector('.login-btn').addEventListener('click', function (e) {
  e.preventDefault();
  login();
});
