document.addEventListener('DOMContentLoaded', async () => {
  // URL에서 이메일 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get('email');

  if (userEmail) {
    try {
      const orderDetails = await fetchOrderDetails(userEmail);
      // 주문 정보를 화면에 표시하는 코드 추가
      //   for (let i = 0; i < orderDetails.length; i++) {
      //     displayOrderDetails(orderDetails[i]);
      //   }
    } catch (error) {
      console.error('Error fetching or displaying order details:', error);
    }
  }
});

async function fetchOrderDetails(email) {
  try {
    const response = await axios.get(`http://localhost:5000/orders/search?email=${email}`);
    // console.log(response.data.data[0]);
    const products = response.data.data[0].products_id;
    const productskeysArray = Object.keys(products); //상품id 배열
    const firstProperty = products[productskeysArray[0]]; //첫번째 상품id 갯수
    console.log(response.data.data[0]);
    console.log(productskeysArray); //상품id 배열
    console.log(firstProperty); //첫번째 상품id 갯수
    return response.data.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
}

function displayOrderDetails(order) {
  const container = document.querySelector('.order-container');

  const products = order.products_id;
  const productskeysArray = Object.keys(products); //상품ID 배열
}
