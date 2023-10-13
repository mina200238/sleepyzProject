const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com/';
const productContainer = document.querySelector('.products-wrap');
const productTable = document.querySelector('.productTable');

function showMainProducts(products) {
  const productsToShow = products.slice(0, 5);

  productsToShow.forEach((product, index) => {
    const productRow = document.createElement('tr');

    // 번호 추가
    const numberCell = document.createElement('td');
    numberCell.textContent = index + 1;
    productRow.appendChild(numberCell);

    // 이미지 추가
    const imageCell = document.createElement('td');
    if (product.image_id && product.image_id.thumbnail_url && product.image_id.thumbnail_url.length > 0) {
      const imgElement = document.createElement('img');
      imgElement.src = product.image_id.thumbnail_url[0];
      imgElement.height = 50;
      const linkElement = document.createElement('a');
      linkElement.href = `${BASE_URL}/pages/Products-Info/${product._id}`; // 상세 상품 페이지로 링크
      linkElement.appendChild(imgElement);
      imageCell.appendChild(linkElement);
    }

    productRow.appendChild(imageCell);

    // 상품명
    const nameCell = document.createElement('td');
    nameCell.textContent = product['name'];
    productRow.appendChild(nameCell);

    // 가격 추가
    const priceCell = document.createElement('td');
    priceCell.textContent = product['price'];
    productRow.appendChild(priceCell);

    //카테고리 추가
    const categoryCell = document.createElement('td');
    categoryCell.textContent = product['category'].category_name;
    productRow.appendChild(categoryCell);

    // 상품 수정 버튼 추가
    const fixButton = document.createElement('button');
    fixButton.textContent = '상품 수정';
    fixButton.onclick = () => {
      productFix(product._id);
    };
    // 마지막으로 삭제 버튼 추가
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '상품 삭제';
    deleteButton.onclick = () => {
      productDelete(product._id);
    };

    const manageTd = document.createElement('td');
    const divButton = document.createElement('div');
    divButton.className = 'tdButton';
    divButton.append(fixButton);
    divButton.append(deleteButton);
    manageTd.append(divButton);
    productRow.appendChild(manageTd);
    productTable.appendChild(productRow);
  });
}

// 모달
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
span.onclick = function () {
  modal.style.display = 'none';
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// 함수, 버튼
function productAdd() {
  console.log('여기');
  modal.style.display = 'block';
}

function productFix(product_id) {
  console.log(product_id);
}

function productDelete(product_id) {
  console.log(product_id);
}

let imageUrl;
async function uploadImage(e) {
  e.preventDefault();
  const file = imageInput.files[0];
  if (!file) {
    alert('이미지를 선택해주세요.');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    // axios를 사용하여 이미지 업로드
    const response = await axios.post('http://kdt-sw-6-team06.elicecoding.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      // 업로드된 이미지를 화면에 표시
      imageUrl = response.data;
      console.log(imageUrl);
    } else {
      console.error('이미지 업로드 실패');
    }
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
  }
}

const addButton = document.querySelector('.addButton');
addButton.addEventListener('click', () => {
  productAdd();
});

const imageButton = document.querySelector('.imageUpload');
imageButton.addEventListener('click', (e) => {
  uploadImage(e);
});

axios
  .get(`${BASE_URL}/products`)
  .then((response) => {
    const products = response.data.data;
    showMainProducts(products);
  })
  .catch((error) => {
    console.error('데이터를 불러올 수 없습니다:', error);
  });

// 제출
document.querySelector('.modal-content form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the form from submitting via the browser

  const formData = new FormData(this);

  const product = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    image_id: [imageUrl],
  };

  console.log(product); // Log the product object to the console

  try {
    const response = await axios.post(`${BASE_URL}/admin/products`, product);
    if (response.status === 200) {
      // 업로드된 이미지를 화면에 표시

      console.log(response);
    } else {
      console.error('상품 추가 실패');
    }
  } catch (err) {
    console.log(err);
  }
  // 이제 'product' 객체를 사용하여 서버에 데이터를 전송하거나 다른 작업을 수행할 수 있습니다.
});
