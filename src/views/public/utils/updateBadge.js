// 장바구니 아이콘 badge 숫자 업데이트
export default function updateBadge() {
  const badgeElement = document.getElementById('cart-badge');
  if (badgeElement) {
    const itemCount = localStorage.length;
    badgeElement.textContent = itemCount.toString();
  }
}
