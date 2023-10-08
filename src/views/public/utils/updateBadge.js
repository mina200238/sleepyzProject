// 장바구니 아이콘 badge 숫자 업데이트
export default function updateBadge(itemCount) {
  const badgeElement = document.getElementById('cart-badge');
  if (badgeElement) {
    badgeElement.textContent = itemCount.toString();
  }
}
