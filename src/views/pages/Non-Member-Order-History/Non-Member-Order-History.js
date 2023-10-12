const checkBtn = document.querySelector('.check-btn');

checkBtn.addEventListener('click', function () {
  const email = document.getElementById('email').value;

  window.location.href = `/pages/Order-History/Order-History.html?email=${email}`;
});
