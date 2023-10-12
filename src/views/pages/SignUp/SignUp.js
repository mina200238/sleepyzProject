const submitForm = function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordCheck = document.getElementById('password-check').value;
  const phone_number = document.getElementById('phonenum').value;
  const address = document.getElementById('address').value;

  if (name && email && password && passwordCheck && phone_number && address) {
    // 모든 필드가 유효한 경우 요청 본문을 위한 JSON 객체를 생성
    const user = {
      name,
      email,
      password,
      phone_number,
      address,
    };
    console.log(user);

    // 서버로 POST 요청 보내기
    fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          // 등록이 성공적으로 이루어진 경우
          alert('가입이 성공했습니다');
          // 사용자를 다른 페이지로 리디렉션하거나 필요한 다른 조치를 취할 수 있습니다
        } else {
          // 등록 오류를 처리합니다. 예: 이미 사용 중인 이메일 등
          alert('가입에 실패했습니다. 다시 시도해 주세요.');
        }
      })
      .catch((error) => {
        console.error('오류:', error);
      });
  }
};

// 비밀번호 유효성 검사
function checkPasswordLength(input) {
  let passwordWarning = document.getElementById('password-warning');
  const passwordCheckInput = document.getElementById('password-check');
  const signupButton = document.querySelector('.signup-btn');

  if (input.value.length > 0 && input.value.length < 4) {
    // 비밀번호가 4글자 미만일 때 보여줄 메시지
    if (!passwordWarning) {
      passwordWarning = document.createElement('small');
      passwordWarning.id = 'password-warning';
      passwordWarning.style.color = 'red';
      passwordWarning.style.fontSize = '12px';

      input.parentNode.appendChild(passwordWarning);
    }
    passwordWarning.textContent = '비밀번호는 최소 4글자 이상으로 작성해 주세요.';
    // 조건 미충족시 비밀번호 확인란 비활성화
    passwordCheckInput.value = '';
    passwordCheckInput.disabled = true;
    signupButton.disabled = true;
  } else {
    // If password is long enough, remove the warning message
    if (passwordWarning) {
      passwordWarning.parentNode.removeChild(passwordWarning);
    }
    // 조건 충족 시, 비밀번호 확인란 활성화
    passwordCheckInput.disabled = false;
    signupButton.disabled = false;
    checkPasswordMatch();
  }
}

// 비밀번호 확인
function checkPasswordMatch() {
  const password = document.getElementById('password').value;
  const passwordCheck = document.getElementById('password-check').value;
  let passwordWarning = document.getElementById('password-warning');
  const signupButton = document.querySelector('.signup-btn');

  if (password !== passwordCheck) {
    if (!passwordWarning) {
      passwordWarning = document.createElement('small');
      passwordWarning.id = 'password-warning';
      passwordWarning.style.color = 'red';
      passwordWarning.style.fontSize = '12px';

      const pwCheck = document.querySelector('.pw-check');
      pwCheck.appendChild(passwordWarning);
    }
    passwordWarning.textContent = '비밀번호가 일치하지 않습니다.';
    signupButton.disabled = true;
  } else {
    if (passwordWarning) {
      passwordWarning.parentNode.removeChild(passwordWarning);
      signupButton.disabled = false;
    }
  }
}

function checkEmail(input) {
  let emailWarning = document.getElementById('email-warning');
  const signupButton = document.querySelector('.signup-btn');

  if (!input.value.includes('@') || !input.value.includes('.')) {
    if (!emailWarning) {
      emailWarning = document.createElement('small');
      emailWarning.id = 'email-warning';
      emailWarning.style.color = 'red';
      input.parentNode.appendChild(emailWarning);
      emailWarning.style.fontSize = '12px';
    }

    emailWarning.textContent = '유효한 이메일 주소를 입력해주세요.';
    signupButton.disabled = false;
  } else {
    if (emailWarning) {
      emailWarning.parentNode.removeChild(emailWarning);
      signupButton.disabled = false;
    }
  }
}

function checkPhoneNumber(input) {
  let phoneNumWarning = document.getElementById('phoneNum-warning');
  const signupButton = document.querySelector('.signup-btn');

  let phoneNumPattern = /[0-9]{3}-[0-9]{4}-[0-9]{4}/;

  if (!phoneNumPattern.test(input.value)) {
    if (!phoneNumWarning) {
      phoneNumWarning = document.createElement('small');
      phoneNumWarning.id = 'phoneNum-warning';
      phoneNumWarning.style.color = 'red';
      input.parentNode.appendChild(phoneNumWarning);
      phoneNumWarning.style.fontSize = '12px';
    }

    phoneNumWarning.textContent = '(000-0000-0000) 형식의 유효한 전화번호를 입력해주세요.';
    signupButton.disabled = true;
  } else {
    if (phoneNumWarning) {
      phoneNumWarning.parentNode.removeChild(phoneNumWarning);
      signupButton.disabled = false;
    }
  }
}

// 주소 찾기
function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById('extraAddress').value = extraAddr;
      } else {
        document.getElementById('extraAddress').value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('postcode').value = data.zonecode;
      document.getElementById('address').value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('detailAddress').focus();
    },
  }).open();
}

// HTML 요소 가져오기 및 함수 실행 설정

window.addEventListener('DOMContentLoaded', function () {
  let passwordInput = document.getElementById('password');
  passwordInput.addEventListener('input', function () {
    checkPasswordLength(this);
  });

  let passwordCheckInput = document.getElementById('password-check');
  passwordCheckInput.addEventListener('input', function () {
    checkPasswordMatch();
  });

  let emailInput = document.getElementById('email');
  emailInput.addEventListener('input', function () {
    checkEmail(this);
  });

  let phoneNumInput = document.getElementById('phonenum');
  phoneNumInput.addEventListener('input', function () {
    checkPhoneNumber(this);
  });

  let postcodeButton = document.getElementById('btn-postcode');
  postcodeButton.addEventListener('click', function () {
    execDaumPostcode();
  });
});

document.querySelector('.signup-btn').addEventListener('click', function (e) {
  e.preventDefault();
  submitForm();
});
