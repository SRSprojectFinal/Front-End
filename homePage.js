let logoutButton = document.querySelector(".logoutButton");
let account = document.querySelector(".account");
let registerButton = document.querySelector(".registerButton");
let loginButton = document.querySelector(".loginButton");
let cart = document.querySelector(".nav-item-cart");
let bar = document.querySelector(".bar");

if (localStorage.getItem("token") == null) {
  logoutButton.setAttribute("style", "display: none");
  account.setAttribute("style", "display: none");
  cart.setAttribute("style", "display: none");
  bar.setAttribute("style", "display: none");
} else {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  let loggedName = loggedUser.userName;
  const firstNameLoggedUser = loggedName.split(" ")[0];

  let account = document.querySelector(".account");
  account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;
  registerButton.setAttribute("style", "display: none");
  loginButton.setAttribute("style", "display: none");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  window.location.href = "http://127.0.0.1:3000";
}



function addToCart(button) {
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
