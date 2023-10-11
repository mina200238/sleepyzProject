// 장바구니 아이콘 badge 숫자 업데이트
export default function updateBadge() {
  const badgeElement = document.getElementById('cart-badge');
  if (badgeElement) {
    // 로컬 스토리지에서 key들을 모두 가져옴
    const keys = Object.keys(localStorage);

    // "product_"로 시작하는 key들만 필터링
    const productKeys = keys.filter((key) => key.startsWith('product_'));

    // "product_"로 시작하는 key들의 개수를 사용하여 뱃지 아이콘 업데이트
    badgeElement.textContent = productKeys.length.toString();
  }
}
