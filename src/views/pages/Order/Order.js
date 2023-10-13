//URL에서 상품ID, 갯수 쿼리파라미터 가져오기
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.getAll('product_id'); // 모든 상품 ID를 배열로 가져옴
const quantity = urlParams.getAll('quantity'); // 모든 수량을 배열로 가져옴
const productData = []; //상품의 id, name, 가격, 수량을 담을 배열

//주문 내역 부분의 총상품금액, 결제금액을 서버에서 가져와서 화면에 띄움
insertPriceElement();

async function insertPriceElement() {
  const totalProductsPrice = document.getElementById('total-products-price');
  const amountOfPayment = document.getElementById('amount-of-payment');

  // 서버에서 상품 정보를 가져오는 부분
  let totalProductPrice = 0;
  for (let i = 0; i < productId.length; i++) {
    const res = await axios.get(`http://kdt-sw-6-team06.elicecoding.com/products/${productId[i]}`);
    const price = res.data.data[0].price;
    totalProductPrice += price * quantity[i];
    const name = res.data.data[0].name;
    const id = res.data.data[0]._id;
    productData.push([id, name, price, quantity[i]]);
  }

  // 배송비
  const shippingPrice = 2500;

  // 총 결제 금액 계산
  const totalPrice = totalProductPrice + shippingPrice;

  totalProductsPrice.textContent = `${totalProductPrice.toLocaleString()}원`;
  amountOfPayment.textContent = `${totalPrice.toLocaleString()}원`;
}

//'주문자와 동일하게' 버튼 클릭 시 주문자쪽 input 값이 배송지쪽 input에 자동으로 입력됨
const sameOrdererBtn = document.querySelector('.same-orderer-btn');

sameOrdererBtn.addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const phoneNumber = document.getElementById('phone_number').value;
  const postCode = document.getElementById('postcode').value;
  const address = document.getElementById('address').value;
  const detailAddress = document.getElementById('detailAddress').value;
  const extraAddress = document.getElementById('extraAddress').value;

  document.getElementById('receiver_name').value = name;
  document.getElementById('receiver_phone_number').value = phoneNumber;
  document.getElementById('address2').value = address;
  document.getElementById('postcode2').value = postCode;
  document.getElementById('detailAddress2').value = detailAddress;
  document.getElementById('extraAddress2').value = extraAddress;
});

//구매하기 버튼 클릭 시 formdata 생성
const purchaseBtn = document.querySelector('.purchase-btn');
const orderForm = document.getElementById('order-form');

purchaseBtn.addEventListener('click', async function (e) {
  e.preventDefault();

  // 상품 데이터 생성
  const products = [];
  for (let i = 0; i < productId.length; i++) {
    const product = [
      productId[i],
      productData[i][1], // 상품명
      productData[i][2], // 상품 가격
      quantity[i], // 수량
    ];
    products.push(product);
  }

  // 주문자 정보 가져오기
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone_number = document.getElementById('phone_number').value;
  const address = document.getElementById('address').value;

  // 배송지 정보 가져오기
  const receiver_name = document.getElementById('receiver_name').value;
  const receiver_phone_number = document.getElementById('receiver_phone_number').value;
  const receiver_address = document.querySelector('.receiver_address').value; // 이 부분은 클라이언트에서 수정해야 할 부분

  // 데이터 패키징
  const orderData = {
    user_id: '비회원', // 회원/비회원 여부
    products: products, // 상품 데이터
    name,
    email,
    phone_number,
    address,
    receiver_name,
    receiver_phone_number,
    receiver_address,
    delivery_status: '준비중',
  };

  // axios로 생성한 데이터를 서버로 post 요청을 보냄
  try {
    const res = await axios.post('http://kdt-sw-6-team06.elicecoding.com/orders', orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('응답 받음:', res.data);
    //상품 구매를 최종적으로 확인하는 창을 띄움
    if (confirm('상품을 구매하시겠습니까?')) {
      alert('구매가 완료되었습니다!');

      //로컬스토리지에서 선택한 상품들의 데이터를 삭제
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.getAll('product_id');

      // productId를 이용하여 로컬 스토리지에서 해당 상품 정보 삭제
      for (let i = 0; i < productId.length; i++) {
        const productKey = `product_${productId[i]}`;
        const productImageKey = `productImage_${productId[i]}`;
        localStorage.removeItem(productKey);
        localStorage.removeItem(productImageKey);
      }

      //post 요청의 res로 받은 order_id를 다음 페이지인 주문완료페이지로 전달하기(url 사용)
      window.location.href = `/pages/Order-Completed?order_id=${res.data.data.order_id}`;
    } else {
      alert('구매가 취소되었습니다.');
    }
  } catch (err) {
    console.log('에러 발생:', err);
  }
});

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

function addDifferentAddr() {
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
        document.getElementById('extraAddress2').value = extraAddr;
      } else {
        document.getElementById('extraAddress2').value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('postcode2').value = data.zonecode;
      document.getElementById('address2').value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('detailAddress2').focus();
    },
  }).open();
}

// 우편 번호 찾기 버튼
window.addEventListener('DOMContentLoaded', function () {
  let postcodeButton1 = document.getElementById('btn-postcode1');
  let postcodeButton12 = document.getElementById('btn-postcode2');

  postcodeButton1.addEventListener('click', function () {
    execDaumPostcode();
  });
  postcodeButton12.addEventListener('click', function () {
    addDifferentAddr();
  });
});
