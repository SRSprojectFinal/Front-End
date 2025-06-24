function shakeElement() {
  const container = document.querySelector(".container");

  container.classList.add("shake");

  setTimeout(() => {
    container.classList.remove("shake");
  }, 300);
}

function goToRegister(){
    window.location.href = "http://localhost:3000/Register/register.html";
}

function login() {
  let userName = document.getElementById("userName");
  let labelUserName = document.getElementById("labelUserName");

  let email = document.getElementById("email");
  let labelEmail = document.getElementById("labelEmail");

  let password = document.getElementById("password");
  let labelPassword = document.getElementById("labelPassword");

  let msgError = document.getElementById("msgError");

  // Verificar se os campos estão preenchidos
  if (userName.value == "" || email.value == "" || password.value == "") {
    shakeElement();
    userName.setAttribute("style", "border: 1px solid red");
    labelUserName.setAttribute("style", "color: red");
    email.setAttribute("style", "border: 1px solid red");
    labelEmail.setAttribute("style", "color: red");
    password.setAttribute("style", "border: 1px solid red");
    labelPassword.setAttribute("style", "color: red");
    msgError.setAttribute("style", "display: block");
    return;
  }

  // Dados para enviar ao backend
  const dadosLogin = {
    email: email.value,
    senha: password.value
  };

  // Fazer fetch para o backend
  fetch('http://localhost:8080/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosLogin)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(data.usuario);
      const usuario = data.usuario;
      
      // Criar token e salvar dados do usuário
      let token = Math.random().toString(16).substring(2);
      localStorage.setItem("token", token);
      
      const loggedUser = {
        userName: usuario.nomeCompleto,
        email: usuario.emailEducacional,
        tipoUsuario: usuario.tipoUsuario
      };
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      
      if (usuario.tipoUsuario === "ALUNO") {
        window.location.href = "http://localhost:3000/StudentSection/studentSection.html";
      } else if (usuario.tipoUsuario === "PROFESSOR") {
        window.location.href = "http://localhost:3000/ProfessorSection/professorSection.html";
      } else if (usuario.tipoUsuario === "ADMIN") {
        window.location.href = "http://localhost:3000/AdminSection/adminSection.html";
      } else {
        
        window.location.href = "http://localhost:3000";
      }
    } else {
      
      shakeElement();
      userName.setAttribute("style", "border: 1px solid red");
      labelUserName.setAttribute("style", "color: red");
      email.setAttribute("style", "border: 1px solid red");
      labelEmail.setAttribute("style", "color: red");
      password.setAttribute("style", "border: 1px solid red");
      labelPassword.setAttribute("style", "color: red");
      msgError.innerHTML = data.message || "E-mail ou senha inválidos.";
      msgError.setAttribute("style", "display: block");
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    shakeElement();
    userName.setAttribute("style", "border: 1px solid red");
    labelUserName.setAttribute("style", "color: red");
    email.setAttribute("style", "border: 1px solid red");
    labelEmail.setAttribute("style", "color: red");
    password.setAttribute("style", "border: 1px solid red");
    labelPassword.setAttribute("style", "color: red");
    msgError.innerHTML = "Erro de conexão com o servidor!";
    msgError.setAttribute("style", "display: block");
  });
}
