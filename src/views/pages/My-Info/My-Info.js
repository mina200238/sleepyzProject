document.addEventListener('DOMContentLoaded', function () {
  const unregisterLink = document.querySelector('.unregister');

  unregisterLink.addEventListener('click', function (e) {
    e.preventDefault();

    if (!confirm('정말로 회원탈퇴를 하시겠습니까?')) {
      return;
    }

    // DELETE 요청을 보내기 위한 설정
    const url = '/users/signout';
    const headers = {
      authorization: '실제 토큰 값을 넣으면 됨',
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
  const changePasswordButton = document.getElementById('change-password-button');

  if (changePasswordButton) {
    changePasswordButton.addEventListener('click', function () {
      console.log('click');
      modal.style.display = 'block';
    });
  }
});
