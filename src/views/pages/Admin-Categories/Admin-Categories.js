const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com/';
const tableBody = document.querySelector('.table-body');
const addCategoryBtn = document.querySelector('.add-category-btn');

// delete category
const deleteCategory = async (categoryId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/admin/categories`, {
      headers: {
        'Content-Type': 'application/json', // 요청 헤더에 JSON 형식으로 데이터를 보낸다고 명시,
        category_id: categoryId,
      },
    });

    console.log('DELETE 요청이 완료되었습니다.', res.data);
  } catch (error) {
    console.error('DELETE 요청 중 오류가 발생했습니다.', error);
    // 오류가 발생한 경우의 동작을 여기에 추가할 수 있습니다.
  }
};

tableBody.addEventListener('click', (e) => {
  const isDeleteButton = e.target.classList.contains('delete-category-btn');
  if (!isDeleteButton) return;

  if (isDeleteButton) {
    const deleteConfirmed = confirm('정말 삭제하시겠습니까?');

    if (deleteConfirmed) {
      // 사용자가 확인 대화상자에서 "예"를 클릭한 경우
      // 삭제 작업 수행
      const tableRow = e.target.closest('tr');

      const tableData = tableRow.querySelector('td');
      // console.log(tableData);
      const dataId = tableData.dataset.id;
      // console.log(dataId);

      deleteCategory(dataId);

      tableRow.remove();
    } else {
      // 사용자가 확인 대화상자에서 "아니오"를 클릭한 경우 또는 취소한 경우
      // 삭제 작업 취소 또는 다른 동작 수행
      console.log('삭제 취소');
    }
  }
});

const selectTableRow = (e) => {
  // check category
};

const addCategory = () => {
  // add category
};

const renderCategories = async (categories) => {
  tableBody.innerHTML = '';

  const getCategoryCount = categories.length;
  const categoryCount = document.querySelector('.category-count');
  categoryCount.innerHTML = getCategoryCount;

  for (const category of categories) {
    let productCount;

    try {
      const response = await axios.get(`${BASE_URL}/products/category?category_name=${category.category_name}`);
      productCount = response.data.data.length;
    } catch (error) {
      console.error('데이터를 불러올 수 없습니다:', error);
      productCount = 0; // 에러 발생 시 상품 개수를 0으로 설정하거나 다른 처리를 할 수 있습니다.
    }

    const markup = `
      <tr>
        <td data-id=${category._id}>${category.category_name}</td>
        <td>${productCount}</td>
        <td>
          <button class="edit-category-btn">수정</button>
          <button class="delete-category-btn">삭제</button>
        </td>
      </tr>
    `;

    tableBody.insertAdjacentHTML('beforeend', markup);
  }
};

// 페이지 로드 시 카테고리 데이터를 백엔드로부터 가져와 테이블에 렌더링
window.onload = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/categories`);
    const categories = response.data.category_data;
    renderCategories(categories); // 데이터를 받아온 후 렌더링
  } catch (error) {
    console.error('데이터를 불러올 수 없습니다:', error);
  }
};
