let logoutButton = document.querySelector(".logoutButton");
let account = document.querySelector(".account");
let registerButton = document.querySelector(".registerButton");
let loginButton = document.querySelector(".loginButton");
let studentSection = document.querySelector(".studentSection");
let adminSection = document.querySelector(".adminSection");
let professorSection = document.querySelector(".professorSection");
let navLinks = document.querySelector(".nav-links");
let cart = document.querySelector(".nav-links-cart");
let bar = document.querySelector(".bar");

let canAddToCart = true;

if (localStorage.getItem("token") == null) {
  logoutButton.setAttribute("style", "display: none");
  account.setAttribute("style", "display: none");
  bar.setAttribute("style", "display: none");

  navLinks.removeChild(studentSection);
  navLinks.removeChild(professorSection);
  navLinks.removeChild(adminSection);

} else {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  let loggedName = loggedUser.userName;
  const firstNameLoggedUser = loggedName.split(" ")[0];

  let account = document.querySelector(".account");
  account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;
  registerButton.setAttribute("style", "display: none");
  loginButton.setAttribute("style", "display: none");

  let loggedEmail = loggedUser.email;

  if(loggedEmail.includes("@student.srs.edu")) {
    navLinks.insertAdjacentHTML("beforeend", `<li class="studentSection"><a href="http://127.0.0.1:3000/StudentSection/studentSection.html">Student Section</a></li>`);
    cart.setAttribute("style", "display: flex");
  }

  if(loggedEmail.includes("@professor.srs.edu")) {
    navLinks.insertAdjacentHTML("beforeend", `<li class="professorSection"><a href="http://127.0.0.1:3000/ProfessorSection/professorSection.html">Professor Section</a></li>`);
    canAddToCart = false;
  }

  if(loggedEmail.includes("@admin.com")) {
    navLinks.insertAdjacentHTML("beforeend", `<li class="adminSection"><a href="http://127.0.0.1:3000/AdminSection/adminSection.html">Admin Section</a></li>`);
    canAddToCart = false;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "http://127.0.0.1:3000";
}



function addToCart(button) {

  if (!canAddToCart) {
    alert("You do not have permission to add products to the cart!");
    return;
  }

  const productsInfos = button.parentElement;
  const ProductName = productsInfos.querySelector("h3").textContent;

  let ProductToCart = {
    ProductNameCart: ProductName,
  };

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const verificationCart = cart.some(
    (item) =>
      item.ProductNameCart === ProductToCart.ProductNameCart
  );

  if (verificationCart) {
    alert("This product is already in the cart!");
  } else {
    cart.push(ProductToCart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}



function goToLogin(){
    window.location.href = "http://127.0.0.1:3000/Login/login.html";
}

function goToRegister(){
    window.location.href = "http://127.0.0.1:3000/Register/register.html";
}

function goToAboutUs(){
    window.location.href = "http://127.0.0.1:3000/#footer";
}

function goToCourses(){
    window.location.href = "http://127.0.0.1:3000/#coursesSection";
}
