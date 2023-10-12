document.addEventListener('DOMContentLoaded', async () => {
  // URL에서 이메일 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get('email');

  if (userEmail) {
    try {
      const orderDetails = await fetchOrderDetails(userEmail);
      const container = document.querySelector('.order-container');

      const products = orderDetails[0].products_id;
      const productskeysArray = Object.keys(products);
      console.log(`productskeysArray: ${productskeysArray}`);
      const productId = productskeysArray[0];
      const response = await axios.get(`http://localhost:5000/products/6524bc616e44b087ce217c8e`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching or displaying order details:', error);
    }
  }
});

async function fetchOrderDetails(email) {
  try {
    const response = await axios.get(`http://localhost:5000/orders/search?email=${email}`);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
}
