const purchaseBtn = document.querySelector('.purchaseBtn');

purchaseBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone_number = document.getElementById('phone_number').value;
  const receiver_name = document.getElementById('receiver_name').value;
  const receiver_phone_number = document.getElementById(
    'receiver_phone_number',
  ).value;
  const address = document.getElementById('address').value;

  console.log({
    name: name,
    email: email,
    phone_number: phone_number,
    receiver_name: receiver_name,
    receiver_phone_number: receiver_phone_number,
    address: address,
  });
});
