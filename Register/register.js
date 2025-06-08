let labelName = document.getElementById("labelName");
let nameInput = document.getElementById("name");
let validName = false;

let labelEmail = document.getElementById("labelEmail");
let emailInput = document.getElementById("email");
let validEmail = false;

let labelPassword = document.getElementById("labelPassword");
let passwordInput = document.getElementById("password");
let validPassword = false;

let labelConfirmPassword = document.getElementById("labelConfirmPassword");
let confirmPasswordInput = document.getElementById("confirmPassword");
let validConfirmPassword = false;

let msgError = document.getElementById("msgError");



function goToLogin() {
    window.location.href = "http://127.0.0.1:3000/Login/login.html";
}

function shakeElement() {
  const container = document.querySelector(".container");

  container.classList.add("shake");

  setTimeout(() => {
    container.classList.remove("shake");
  }, 300);
}

nameInput.addEventListener("keyup", () => {
  if (nameInput.value.length <= 2) {
    labelName.setAttribute("style", "color: red");
    labelName.innerHTML = "Name *put 3 characters";
    nameInput.setAttribute("style", "border: 1px solid red");
    validName = false;
  } else {
    labelName.setAttribute("style", "color: black");
    labelName.innerHTML = "Name";
    nameInput.setAttribute("style", "border: 1px solid black");
    validName = true;
  }
});

emailInput.addEventListener("keyup", () => {
  if (!emailInput.value.includes("@")) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "Email *must contain @";
    emailInput.setAttribute("style", "border: 1px solid red");
    validEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: black");
    labelEmail.innerHTML = "Email";
    emailInput.setAttribute("style", "border: 1px solid black");
    validEmail = true;
  }
});

passwordInput.addEventListener("keyup", () => {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  if (
    !passwordRegex.test(passwordInput.value) ||
    passwordInput.value.length < 6
  ) {
    labelPassword.setAttribute("style", "color: red");
    labelPassword.innerHTML =
      "Password * Password criteria not met";
    passwordInput.setAttribute("style", "border: 1px solid red");
    validPassword = false;
  } else {
    labelPassword.setAttribute("style", "color: black");
    labelPassword.innerHTML = "Password";
    passwordInput.setAttribute("style", "border: 1px solid black");
    validPassword = true;
  }
});

confirmPasswordInput.addEventListener("keyup", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    labelConfirmPassword.setAttribute("style", "color: red");
    labelConfirmPassword.innerHTML =
      "Confirm Password *Password mismatch";
    confirmPasswordInput.setAttribute("style", "border: 1px solid red");
    validConfirmPassword = false;
  } else {
    labelConfirmPassword.setAttribute("style", "color: black");
    labelConfirmPassword.innerHTML = "Confirm Password";
    confirmPasswordInput.setAttribute("style", "border: 1px solid black");
    validConfirmPassword = true;
  }
});

function register() {
  if (
    validName &&
    validEmail &&
    validPassword &&
    validConfirmPassword
  ) {
    let userList = JSON.parse(localStorage.getItem("userList") || "[]");

    userList.push({
      regName: nameInput.value,
      regEmail: emailInput.value,
      regPassword: passwordInput.value,
    });

    localStorage.setItem("userList", JSON.stringify(userList));

    msgError.setAttribute("style", "display: none");

    window.location.href = "http://127.0.0.1:3000/Login/login.html";
  } else {
    msgError.innerHTML = "Fill in all fields with valid information!";
    msgError.setAttribute("style", "display: block");
    shakeElement();
  }
}