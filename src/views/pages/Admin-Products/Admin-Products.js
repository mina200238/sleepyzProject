const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';
const productContainer = document.querySelector('.products-wrap');
const productTable = document.querySelector('.productTable');

function showMainProducts(showProducts, start) {
  const productsToShow = showProducts;

  productsToShow.forEach((product, index) => {
    const productRow = document.createElement('tr');

    // 번호 추가
    const numberCell = document.createElement('td');
    numberCell.textContent = products.length - (start + index);
    productRow.appendChild(numberCell);

    // 이미지 추가
    const imageCell = document.createElement('td');
    if (product.image_id && product.image_id.thumbnail_url && product.image_id.thumbnail_url.length > 0) {
      const imgElement = document.createElement('img');
      imgElement.src = product.image_id.thumbnail_url[0];
      imgElement.height = 60;
      imgElement.width = 50;
      const linkElement = document.createElement('a');
      linkElement.href = `${BASE_URL}/pages/Product-Info/?product_id=${product._id}`; // 상세 상품 페이지로 링크
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
    fixButton.className = 'btn';
    fixButton.textContent = '상품 수정';
    fixButton.onclick = () => {
      productFix(product._id);
    };
    // 마지막으로 삭제 버튼 추가
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn';
    deleteButton.textContent = '상품 삭제';
    deleteButton.onclick = () => {
      if (confirm('정말 상품을 삭제하시겠습니까?')) {
        productDelete(product._id);
      }
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

// 추가 모달
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
span.onclick = function () {
  modal.classList.add('hidden');
};
window.onclick = function (event) {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
  if (event.target === _modal) {
    _modal.classList.add('hidden');
  }
};
// 수정 모달
const _modal = document.getElementById('_myModal');
const _span = document.getElementsByClassName('_close')[0];
_span.onclick = function () {
  _modal.classList.add('hidden');
};

// 함수, 버튼
function productAdd() {
  modal.classList.remove('hidden');
}
let fixProduct_id;
async function productFix(product_id) {
  _modal.classList.remove('hidden');
  fixProduct_id = product_id;
  const fixProduct = await axios.get(`${BASE_URL}/products/${fixProduct_id}`);
  const fillData = fixProduct.data.data[0];
  console.log('상품정보:', fixProduct);
  const input_name = document.getElementById('_name');
  input_name.value = fillData.name;
  const input_description = document.getElementById('_description');
  input_description.value = fillData.description;
  const input_price = document.getElementById('_price');
  input_price.value = fillData.price;
  const input_category = document.getElementById('_category');
  input_category.value = fillData.category.category_name;
}

async function productDelete(product_id) {
  console.log(product_id);
  const access = getCookie('accessToken');

  try {
    const response = await axios.delete(`${BASE_URL}/admin/products`, {
      headers: {
        product_id: product_id,
        authorization: access,
      },
    });
    if (response.status === 200) {
      console.log(response);
      alert('상품 삭제 성공');
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

let imageUrl;
// 추가 이미지 업로드
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
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      // 업로드된 이미지를 화면에 표시
      imageUrl = response.data;
      console.log(imageUrl);
      alert('이미지 업로드 성공');
      const submitButton = document.getElementById('submitButton');
      submitButton.disabled = false;
    } else {
      console.error('이미지 업로드 실패');
    }
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
  }
}
//수정 이미지업로드
async function _uploadImage(e) {
  e.preventDefault();
  const file = _imageInput.files[0];
  if (!file) {
    alert('이미지를 선택해주세요.');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    // axios를 사용하여 이미지 업로드
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      // 업로드된 이미지를 화면에 표시
      imageUrl = response.data;
      console.log(imageUrl);
      alert('이미지 업로드 성공');
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

const _imageButton = document.querySelector('._imageUpload');
_imageButton.addEventListener('click', (e) => {
  _uploadImage(e);
});

function getCookie(name) {
  // 쿠키 가져오기
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

// 추가 제출
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
  const access = getCookie('accessToken');
  try {
    const response = await axios.post(`${BASE_URL}/admin/products`, product, {
      headers: {
        authorization: access,
      },
    });
    if (response.status === 200) {
      // 업로드된 이미지를 화면에 표시

      console.log(response);
      modal.classList.add('hidden');
      alert('상품 추가 성공!');
      this.reset();
      location.reload();
    } else {
      console.error('상품 추가 실패');
    }
  } catch (err) {
    console.log(err);
  }
  // 이제 'product' 객체를 사용하여 서버에 데이터를 전송하거나 다른 작업을 수행할 수 있습니다.
});

// 수정 제출
document.querySelector('._modal-content form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the form from submitting via the browser

  const formData = new FormData(this);

  const product = {
    product_id: fixProduct_id,
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    image_id: [imageUrl],
  };

  console.log(product); // Log the product object to the console
  const access = getCookie('accessToken');
  try {
    const response = await axios.put(`${BASE_URL}/admin/products`, product, {
      headers: {
        authorization: access,
      },
    });
    if (response.status === 200) {
      // 업로드된 이미지를 화면에 표시

      console.log(response);
      _modal.classList.add('hidden');
      alert('상품 수정 성공!');
      this.reset();
      location.reload();
    } else {
      console.error('상품 수정 실패');
    }
  } catch (err) {
    console.log(err);
  }
  // 이제 'product' 객체를 사용하여 서버에 데이터를 전송하거나 다른 작업을 수행할 수 있습니다.
});

let products = [];
let currentPage = 1; // 현재 페이지 번호
const itemsPerPage = 5; // 한 페이지에 표시할 항목 수

function showPage(pageNumber) {
  // 페이지에 보여주기
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  productTable.innerHTML = `<tr>
  <th class="table_number" style="width: 10%">번호</th>
  <th class="table_image" style="width: 20%">이미지</th>
  <th class="table_name" style="width: 40%">상품명</th>
  <th class="table_price" style="width: 10%">가격</th>
  <th class="table_category" style="width: 10%">카테고리</th>
  <th class="table_manage" style="width: 10%">관리</th>
</tr>`; // 기존 상품 목록 삭제

  const productsToShow = products.slice(start, end);

  showMainProducts(productsToShow, start); // 상품 목록 업데이트
}
function createPaginationButtons(totalItems) {
  //
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById('pagination');

  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerText = i;
    btn.onclick = function () {
      currentPage = i;
      showPage(currentPage);
    };

    paginationContainer.appendChild(btn);
  }
}
axios
  .get(`${BASE_URL}/products`)
  .then((response) => {
    products = response.data.data.reverse();
    createPaginationButtons(products.length); // Pagination buttons 생성

    showPage(currentPage);
  })
  .catch((error) => {
    console.error('데이터를 불러올 수 없습니다:', error);
  });
