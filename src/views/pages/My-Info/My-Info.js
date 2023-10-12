document.addEventListener('DOMContentLoaded', function () {
  const unregisterLink = document.querySelector('.unregister');

  unregisterLink.addEventListener('click', function (e) {
    e.preventDefault();

    if (!confirm('정말로 회원탈퇴를 하시겠습니까?')) {
      return;
    }

    // DELETE 요청
    const url = '/users/signout';
    const headers = {
      authorization:
        'jM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };

    axios
      .delete(url, { headers: headers })
      .then((response) => {
        alert('회원탈퇴가 완료되었습니다.');
        window.location.href = '/pages';
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

  if (submitPasswordChange) {
    submitPasswordChange.addEventListener('click', function () {
      const newPasswordValue = newPasswordInput.value;

      if (!newPasswordValue) {
        alert('새로운 비밀번호를 입력해주세요.');
        return;
      }

      const url = '/users/password';
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
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  userInfoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userData = {
      name: usernameInput.value,
      email: emailInput.value,
      phone_number: phoneInput.value,
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
