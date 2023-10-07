document
  .getElementById('orderForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // form의 기본 제출 동작 중단

    var formData = new FormData(this);

    // FormData 객체를 순회하며 키-값 쌍 출력
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  });
