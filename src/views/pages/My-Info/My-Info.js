const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';

document.addEventListener('DOMContentLoaded', async function () {
  const unregisterLink = document.querySelector('.unregister');

  unregisterLink.addEventListener('click', async function (e) {
    e.preventDefault();

    if (!confirm('정말로 회원탈퇴를 하시겠습니까?')) {
      return;
    }

    // DELETE 요청
    const headers = {
      authorization:
        'jM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };

    await axios
      .delete(`${BASE_URL}/users/signout`, { headers: headers })
      .then((response) => {
        if (response.status === 204) {
          alert('회원탈퇴가 완료되었습니다.');
        } else {
          console.error('회원탈퇴 실패:', response.data.message);
        }
      })
      .catch((error) => {
        alert('회원탈퇴 중 오류가 발생하였습니다.');
        console.error(error);
      });
  });

  const modal = document.getElementById('passwordModal');
  const openModalButton = document.getElementById('change-password-button');
  const closeModalButton = document.getElementById('close-modal-button');
  const submitPasswordChange = document.getElementById('submit-password-change');
  const newPasswordInput = document.getElementById('newPassword');

  if (openModalButton) {
    openModalButton.addEventListener('click', function () {
      modal.style.display = 'block';
    });
  }

  if (closeModalButton) {
    closeModalButton.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }

  //비밀번호 변경
  if (submitPasswordChange) {
    submitPasswordChange.addEventListener('click', function () {
      const newPasswordValue = newPasswordInput.value;

      if (!newPasswordValue) {
        alert('새로운 비밀번호를 입력해주세요.');
        return;
      }

      const url = `${BASE_URL}/users/password`;
      const headers = {
        authorization:
          'jM0NTY3ODkwIiwibnFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };

      axios
        .put(url, { new_password: newPasswordValue }, { headers: headers })
        .then((response) => {
          alert('비밀번호가 변경되었습니다.');
          modal.style.display = 'none';
        })
        .catch((error) => {
          alert('비밀번호 변경 중 오류가 발생하였습니다.');
          console.error(error);
        });
    });
  }
  const userInfoForm = document.querySelector('form');
  const usernameInput = document.getElementById('username');
  const phoneInput = document.getElementById('phone');
  const addressInput = document.getElementById('address');

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
  const access = getCookie(accessToken);
  const myData = await axios.get(`${BASE_URL}/users/userInfo`, {
    headers: {
      authorization: access,
    },
  });
  console.log(myData);

  //회원정보 변경
  userInfoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userData = {
      name: usernameInput.value,
      phone_number: phoneInput.value,
      address: addressInput.value,
    };

    const url = '/users/userInfo';
    const headers = {
      authorization: '토큰 자리',
      'Content-Type': 'application/json',
    };

    axios
      .put(url, userData, { headers: headers })
      .then((response) => {
        alert('수정이 완료되었습니다.');
      })
      .catch((error) => {
        alert('회원정보 수정 중 오류가 발생하였습니다.');
        console.error(error);
      });
  });
});

// 비밀번호 길이 검증
const currentPasswordElement = document.getElementById('currentPassword');
currentPasswordElement.addEventListener('input', function () {
  validatePasswordLength(currentPasswordElement);
});

// 비밀번호 일치 여부 검증
const newPasswordElement = document.getElementById('newPassword');
newPasswordElement.addEventListener('input', validatePasswordMatch);

// 전화번호 형식 검증
const phoneElement = document.getElementById('phone');
phoneElement.addEventListener('input', function () {
  validatePhoneNumber(phoneElement);
});

function validatePasswordLength(inputElement) {
  const MIN_PASSWORD_LENGTH = 4;
  const warningElement = document.getElementById('password-warning');
  const confirmPasswordElement = document.getElementById('password-check');

  if (inputElement.value.length > 0 && inputElement.value.length < MIN_PASSWORD_LENGTH) {
    if (!warningElement) {
      const warningMessage = document.createElement('small');
      warningMessage.id = 'password-warning';
      warningMessage.style.color = 'red';
      warningMessage.style.fontSize = '12px';
      warningMessage.textContent = '비밀번호는 최소 4글자 이상으로 작성해 주세요.';
      inputElement.parentNode.appendChild(warningMessage);
    }
    confirmPasswordElement.value = '';
    confirmPasswordElement.disabled = true;
  } else {
    if (warningElement) {
      warningElement.parentNode.removeChild(warningElement);
    }
    confirmPasswordElement.disabled = false;
    validatePasswordMatch();
  }
}

// 비밀번호 일치 여부 검증
function validatePasswordMatch() {
  const passwordElement = document.getElementById('password');
  const confirmPasswordElement = document.getElementById('password-check');
  let warningElement = document.getElementById('password-warning');

  if (passwordElement.value !== confirmPasswordElement.value) {
    if (!warningElement) {
      warningElement = document.createElement('small');
      warningElement.id = 'password-warning';
      warningElement.style.color = 'red';
      warningElement.style.fontSize = '12px';
      confirmPasswordElement.parentNode.appendChild(warningElement);
    }
    warningElement.textContent = '비밀번호가 일치하지 않습니다.';
  } else {
    if (warningElement) {
      warningElement.parentNode.removeChild(warningElement);
    }
  }
}

function validatePhoneNumber(inputElement) {
  const phoneNumberPattern = /[0-9]{3}-[0-9]{4}-[0-9]{4}/;
  const isValidPhone = phoneNumberPattern.test(inputElement.value);
  const warningElement = document.getElementById('phoneNum-warning');

  if (!isValidPhone) {
    if (!warningElement) {
      const warningMessage = document.createElement('small');
      warningMessage.id = 'phoneNum-warning';
      warningMessage.style.color = 'red';
      warningMessage.style.fontSize = '12px';
      warningMessage.textContent = '(000-0000-0000) 형식의 유효한 전화번호를 입력해주세요.';
      inputElement.parentNode.appendChild(warningMessage);
    }
  } else {
    if (warningElement) {
      warningElement.parentNode.removeChild(warningElement);
    }
  }
}
