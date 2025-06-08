function shakeElement() {
  const container = document.querySelector(".container");

  container.classList.add("shake");

  setTimeout(() => {
    container.classList.remove("shake");
  }, 300);
}

function goToRegister(){
    window.location.href = "http://127.0.0.1:3000/Register/register.html";
}

function login() {
  let userName = document.getElementById("userName");
  let labelUserName = document.getElementById("labelUserName");

  let email = document.getElementById("email");
  let labelEmail = document.getElementById("labelEmail");

  let password = document.getElementById("password");
  let labelPassword = document.getElementById("labelPassword");

  let msgError = document.getElementById("msgError");
  let userList = [];

  let userValid = {
    userName: "",
    email: "",
    password: "",
  };

  if (
    userName.value == "admin" &&
    email.value == "admin@admin.com" &&
    password.value == "admin1234"
  ) {
    window.location.href = "http://127.0.0.1:3000/AdminSection/adminSection.html";

    let token = Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);

    userValid = {
      userName: "admin",
      email: "admin@admin.com",
      password: "admin1234",
    };

    localStorage.setItem("loggedUser", JSON.stringify(userValid));
  }

  
    
  userList = JSON.parse(localStorage.getItem("userList")) || [];

  userList.forEach((item) => {
      if (
        userName.value == item.regName &&
        email.value == item.regEmail &&
        password.value == item.regPassword
      ) {
        userValid = {
          userName: item.regName,
          email: item.regEmail,
          password: item.regPassword,
        };
      }
    });



    if (userName.value == "" || email.value == "" || password.value == "") {
      shakeElement();
      userName.setAttribute("style", "border: 1px solid red");
      labelUserName.setAttribute("style", "color: red");
      email.setAttribute("style", "border: 1px solid red");
      labelEmail.setAttribute("style", "color: red");
      password.setAttribute("style", "border: 1px solid red");
      labelPassword.setAttribute("style", "color: red");
      msgError.setAttribute("style", "display: block");
    } else {
      if (
        userName.value == userValid.userName &&
        email.value == userValid.email &&
        password.value == userValid.password
      ) {
        window.location.href = "http://127.0.0.1:3000";

        let token = Math.random().toString(16).substring(2);
        localStorage.setItem("token", token);

        localStorage.setItem("loggedUser", JSON.stringify(userValid));
      } else {
        shakeElement();
        userName.setAttribute("style", "border: 1px solid red");
        labelUserName.setAttribute("style", "color: red");
        email.setAttribute("style", "border: 1px solid red");
        labelEmail.setAttribute("style", "color: red");
        password.setAttribute("style", "border: 1px solid red");
        labelPassword.setAttribute("style", "color: red");
        msgError.setAttribute("style", "display: block");
      }
    }
  }
