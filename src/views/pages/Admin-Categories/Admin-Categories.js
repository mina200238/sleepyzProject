/**
 * TODO:
 * 삭제 모달 JS 구현
 */

const BASE_URL = 'http://kdt-sw-6-team06.elicecoding.com';

// pagination 관련
const itemsPerPage = 10; // 페이지당 표시할 항목 수
let currentPage = 1; // 현재 페이지 번호
let data = [];
const startsWithNumberRegex = /^\d/; // 숫자로 시작하는지를 확인하는 정규식

// HTML 문서에서 요소들 선택
const tableBody = document.querySelector('.table-body');
const categoryAddModal = document.querySelector('.section-category-add-modal');
const categoryEditModal = document.querySelector('.section-category-edit-modal');
const categoryDeleteModal = document.querySelector('.section-category-delete-modal');
const categoryAddNameInput = document.querySelector('.category-add-input');
const categoryEditNameInput = document.querySelector('.category-edit-input');
const addCategoryBtn = document.querySelector('.add-category-btn');
const confirmAddCategoryBtn = document.querySelector('.btn-add-confirm-category');
const cancelAddCategoryBtn = document.querySelector('.btn-add-cancel-category');
const confirmEditCategoryBtn = document.querySelector('.btn-edit-confirm-category');
const cancelEditCategoryBtn = document.querySelector('.btn-edit-cancel-category');
const confirmDeleteCategoryBtn = document.querySelector('.btn-delete-confirm-category');
const cancelDeleteCategoryBtn = document.querySelector('.btn-delete-cancel-category');

// 카테고리 추가, 수정 취소
cancelAddCategoryBtn.addEventListener('click', () => closeModal());
cancelEditCategoryBtn.addEventListener('click', () => closeModal());
cancelDeleteCategoryBtn.addEventListener('click', () => closeModal());

// '카테고리 추가' 버튼 클릭 이벤트
addCategoryBtn.addEventListener('click', () => {
  categoryAddModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

// 카테고리 추가 모달에서 '확인' 버튼 클릭 이벤트
confirmAddCategoryBtn.addEventListener('click', () => {
  let newCategoryName = categoryAddNameInput.value;
  // 유효성 검사(빈 값, 숫자로 시작 하는 이름 방지)
  if (newCategoryName.trim() === '' || startsWithNumberRegex.test(newCategoryName)) return;

  addCategory(newCategoryName);
});

// 카테고리 추가
const addCategory = async (newCategoryName) => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/categories`, {
      headers: {
        'Content-Type': 'application/json', // 요청 헤더에 JSON 형식으로 데이터를 보낸다고 명시,
      },
      category_name: newCategoryName,
    });

    const { category_name } = res.data.category_data;
    const markup = `
       <tr>
         <td>${category_name}</td>
         <td></td>
         <td>
           <button class="edit-category-btn">수정</button>
           <button class="delete-category-btn">삭제</button>
         </td>
       </tr>
     `;

    closeModal();
    tableBody.insertAdjacentHTML('beforeend', markup);
    windowReload();
  } catch (error) {
    console.error('POST 요청 중 오류가 발생했습니다.', error);
  }
};

// 카테고리 수정
const editCategory = async (targetEl, originalCategoryName, newCategoryName) => {
  try {
    const res = await axios.put(`${BASE_URL}/admin/categories`, {
      headers: {
        'Content-Type': 'application/json', // 요청 헤더에 JSON 형식으로 데이터를 보낸다고 명시,
      },
      data: {
        original_category_name: originalCategoryName,
        new_category_name: newCategoryName,
      },
    });

    const { category_name } = await res.data.category_data;

    targetEl.innerHTML = category_name;

    windowReload();
  } catch (error) {
    console.error('PUT 요청 중 오류가 발생했습니다.', error);
  }
};

// 카테고리 삭제
const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${BASE_URL}/admin/categories`, {
      headers: {
        'Content-Type': 'application/json', // 요청 헤더에 JSON 형식으로 데이터를 보낸다고 명시,
        category_id: categoryId,
      },
    });

    windowReload();
  } catch (error) {
    console.error('DELETE 요청 중 오류가 발생했습니다.', error);
  }
};

function openEditModal(e) {
  e.stopPropagation(); // 💩 이벤트 버블링을 막습니다.
  const categoryEl = this.closest('tr').querySelector('td');
  categoryEditModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  confirmEditCategoryBtn.removeEventListener('click', handleEditConfirmation);
  confirmEditCategoryBtn.addEventListener('click', handleEditConfirmation);

  function handleEditConfirmation() {
    const originalCategoryName = categoryEl.textContent;
    const editCategoryName = categoryEditNameInput.value;
    if (editCategoryName.trim() === '' || startsWithNumberRegex.test(editCategoryName)) return;

    editCategory(categoryEl, originalCategoryName, editCategoryName);
  }
}

function openDeleteModal(e) {
  e.stopPropagation(); // 💩 이벤트 버블링을 막습니다.

  const tableRow = this.closest('tr');
  // 삭제 작업 수행
  const tableData = tableRow.querySelector('td');
  const dataId = tableData.dataset.id;
  categoryDeleteModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  confirmDeleteCategoryBtn.removeEventListener('click', handleDeleteConfirmation);
  confirmDeleteCategoryBtn.addEventListener('click', handleDeleteConfirmation);

  function handleDeleteConfirmation() {
    deleteCategory(dataId);
    tableRow.remove();
  }
}

tableBody.addEventListener('click', (e) => {
  // target 요소가 수정 버튼 일 때
  const isEditButton = e.target.classList.contains('edit-category-btn');

  if (isEditButton) {
    // openEditModal 함수를 호출하고 this 컨텍스트를 현재 클릭한 버튼으로 설정합니다.
    openEditModal.call(e.target, e);
  }

  // target 요소가 삭제 버튼 일 때
  const isDeleteButton = e.target.classList.contains('delete-category-btn');

  if (isDeleteButton) {
    // openEditModal 함수를 호출하고 this 컨텍스트를 현재 클릭한 버튼으로 설정합니다.
    openDeleteModal.call(e.target, e);
  }
});

const renderCategories = async () => {
  tableBody.innerHTML = '';
  const container = [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = data.slice(startIndex, endIndex);

  const getCategoryCount = data.length;
  const categoryCount = document.querySelector('.category-count');
  categoryCount.innerHTML = getCategoryCount;

  for (const category of paginatedCategories) {
    let productCount;

    try {
      const res = await axios.get(`${BASE_URL}/products/category?category_name=${category.category_name}`);
      productCount = res.data.data.length;
    } catch (error) {
      console.error('데이터를 불러올 수 없습니다:', error);
      productCount = 0; // 에러 발생 시 상품 개수를 0으로 설정하거나 다른 처리를 할 수 있습니다.
    }

    const isDefault =
      category.category_name === '이불' ||
      category.category_name === '침대' ||
      category.category_name === '커버' ||
      category.category_name === '베개';

    const markup = `
      <tr>
        <td data-id=${category._id}>${category.category_name}</td>
        <td>${productCount}</td>
        <td>
          <button class="btn edit-category-btn" ${isDefault ? 'disabled' : ''}>수정</button>
          <button class="btn delete-category-btn" ${isDefault ? 'disabled' : ''}>삭제</button>
        </td>
      </tr>
    `;

    container.push(markup);
  }

  tableBody.innerHTML = container.join('');

  const totalPages = Math.ceil(getCategoryCount / itemsPerPage);
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.textContent = i;
    pageLink.href = '#';
    pageLink.classList.add('page-link');
    pageLink.classList.add(`page-link-${i}`);
    pageLink.addEventListener('click', () => {
      currentPage = i;
      renderCategories();
    });

    pagination.appendChild(pageLink);
  }
};

// 페이지 로드 시 카테고리 데이터를 백엔드로부터 가져와 테이블에 렌더링
window.onload = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/categories`);
    const categories = res.data.category_data;
    data = categories;
    renderCategories(); // 데이터를 받아온 후 렌더링
  } catch (error) {
    console.error('데이터를 불러올 수 없습니다:', error);
  }
};

// 모달 외부를 클릭 시, 모달 닫기
window.onclick = function (event) {
  if (event.target === categoryAddModal || event.target === categoryEditModal || event.target === categoryDeleteModal) {
    closeModal();
  }
};

// 카테고리 추가, 수정 모달 확인 및 취소 후, 값 초기화
function closeModal() {
  document.body.classList.remove('modal-open');
  categoryAddModal.classList.add('hidden');
  categoryEditModal.classList.add('hidden');
  categoryDeleteModal.classList.add('hidden');
  categoryAddNameInput.value = '';
  categoryEditNameInput.value = '';
}

function windowReload() {
  window.location.reload();
}
