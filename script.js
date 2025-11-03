function toggleForms() {
  document.getElementById('loginBox').classList.toggle('active');
  document.getElementById('signupBox').classList.toggle('active');
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const role = document.getElementById('roleSelect').value;
  if (email) {
    document.getElementById('loginBox').classList.remove('active');
    document.getElementById('welcomeBox').classList.add('active');
    document.getElementById('welcomeMessage').innerText =
      `Welcome back, ${role.charAt(0).toUpperCase() + role.slice(1)}!`;
  } else {
    alert('Please enter email and password.');
  }
}

function signup() {
  const name = document.getElementById('signupName').value;
  const role = document.getElementById('roleSelect').value;
  if (name) {
    document.getElementById('signupBox').classList.remove('active');
    document.getElementById('welcomeBox').classList.add('active');
    document.getElementById('welcomeMessage').innerText =
      `Account created! Hello ${name}, you are registered as a ${role}.`;
  } else {
    alert('Please fill out all fields.');
  }
}

function logout() {
  document.getElementById('welcomeBox').classList.remove('active');
  document.getElementById('loginBox').classList.add('active');
}
