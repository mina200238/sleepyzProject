axios
  .get('https://example.com/api/data')
  .then((response) => {
    // 성공적으로 데이터를 받아왔을 때 처리할 코드
    console.log(response.data);
  })
  .catch((error) => {
    // 요청이 실패했을 때 처리할 코드
    console.error(error);
  });

function getTodos() {
  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
  })
    .then((res) => console.log(res)) // 수정: console.log로 변경
    .catch((err) => console.log(err)); // 수정: console.log로 변경
}

// getTodos 함수 호출
getTodos();
