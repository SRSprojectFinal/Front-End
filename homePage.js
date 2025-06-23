let carroselInformationsCount = 0;
let carroselCount = 0;

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

let page1 = document.querySelector(".page1");
let page2 = document.querySelector(".page2");

let page1Courses = document.querySelector(".page1Courses");
let page2Courses = document.querySelector(".page2Courses");

let cardFrontEnd = document.querySelector(".cardFrontEnd");
let cardBackEnd = document.querySelector(".cardBackEnd");
let cardMobile = document.querySelector(".cardMobile");
let cardDataScience = document.querySelector(".cardDataScience");
let cardProgrammingBasis = document.querySelector(".cardProgrammingBasis");
let cardUiAndUx = document.querySelector(".cardUiAndUx");

let cardCourseFrontEnd = document.querySelector(".cardCourseFrontEnd");
let cardCourseBackEnd = document.querySelector(".cardCourseBackEnd");
let cardCourseMobile = document.querySelector(".cardCourseMobile");
let cardCourseUiAndUx = document.querySelector(".cardCourseUiAndUx");
let cardCourseDataScience = document.querySelector(".cardCourseDataScience");
let cardCourseProgrammingBasis = document.querySelector(".cardCourseProgrammingBasis");

let canAddToCart = true;

const cardsInformation = [
  cardFrontEnd, cardBackEnd, cardUiAndUx,
  cardMobile, cardProgrammingBasis, cardDataScience
];

const cardsCourses = [
  cardCourseFrontEnd, cardCourseBackEnd, cardCourseUiAndUx,
  cardCourseMobile, cardCourseProgrammingBasis, cardCourseDataScience
];

if (localStorage.getItem("token") == null) {
  logoutButton.style.display = "none";
  account.style.display = "none";
  bar.style.display = "none";

  if (studentSection) navLinks.removeChild(studentSection);
  if (professorSection) navLinks.removeChild(professorSection);
  if (adminSection) navLinks.removeChild(adminSection);

  cart.style.display = "none";

} else {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  let loggedName = loggedUser.userName;
  const firstNameLoggedUser = loggedName.split(" ")[0];

  account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;
  registerButton.style.display = "none";
  loginButton.style.display = "none";

  let loggedEmail = loggedUser.email;

  if(loggedEmail.includes("@student.srs.edu")) {
    navLinks.insertAdjacentHTML("beforeend", `<li class="studentSection"><a href="http://127.0.0.1:3000/StudentSection/studentSection.html">Student Section</a></li>`);
    cart.style.display = "flex";
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

  if (localStorage.getItem("token") == null) {
    window.location.href = "http://127.0.0.1:3000/Login/login.html";
  }

  const productsInfos = button.parentElement;
  const ProductName = productsInfos.querySelector("h4").textContent;

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

function carroselInformationsLeft() {
  carroselInformationsCount--;
  carroselInformationsSection();
}

function carroselInformationsRight() {
  carroselInformationsCount++;
  carroselInformationsSection();
}

function carroselInformationsSection() {
  cardsInformation.forEach(card => card.classList.remove("cardAnimationScale"));

  if (carroselInformationsCount % 2 === 0) {
    cardFrontEnd.classList.remove("displayNone");
    cardBackEnd.classList.remove("displayNone");
    cardUiAndUx.classList.remove("displayNone");

    cardFrontEnd.classList.add("cardAnimationScale");
    cardBackEnd.classList.add("cardAnimationScale");
    cardUiAndUx.classList.add("cardAnimationScale");

    cardMobile.classList.add("displayNone");
    cardProgrammingBasis.classList.add("displayNone");
    cardDataScience.classList.add("displayNone");

    pageSwitch(page1, page2);
  } else {
    cardFrontEnd.classList.add("displayNone");
    cardBackEnd.classList.add("displayNone");
    cardUiAndUx.classList.add("displayNone");

    cardMobile.classList.remove("displayNone");
    cardProgrammingBasis.classList.remove("displayNone");
    cardDataScience.classList.remove("displayNone");

    cardMobile.classList.add("cardAnimationScale");
    cardProgrammingBasis.classList.add("cardAnimationScale");
    cardDataScience.classList.add("cardAnimationScale");

    pageSwitch(page2, page1);
  }
}

function pageSwitch(pageToSelect, pageToUnselect) {
  pageToSelect.classList.remove("animationPageSelected", "animationPageNotSelected");
  pageToUnselect.classList.remove("animationPageSelected", "animationPageNotSelected");

  void pageToSelect.offsetWidth;
  void pageToUnselect.offsetWidth;

  pageToSelect.classList.add("animationPageSelected");
  setTimeout(() => {
    pageToSelect.classList.remove("notSelectedPage");
    pageToSelect.classList.add("selectedPage");
  }, 300);

  pageToUnselect.classList.add("animationPageNotSelected");
  setTimeout(() => {
    pageToUnselect.classList.remove("selectedPage");
    pageToUnselect.classList.add("notSelectedPage");
  }, 300);
}

carroselInformationsSection();

function carroselLeft() {
  carroselCount--;
  carroselCoursesSection();
}

function carroselRight() {
  carroselCount++;
  carroselCoursesSection();
}

function carroselCoursesSection() {
  cardsCourses.forEach(card => card.classList.remove("animationSlideToTop"));

  if (carroselCount % 2 === 0) {
    cardCourseFrontEnd.classList.remove("displayNone");
    cardCourseBackEnd.classList.remove("displayNone");
    cardCourseUiAndUx.classList.remove("displayNone");

    cardCourseFrontEnd.classList.add("animationSlideToTop");
    setTimeout(() => {
      cardCourseBackEnd.classList.add("animationSlideToTop");
    }, 50);
    setTimeout(() => {
      cardCourseUiAndUx.classList.add("animationSlideToTop");
    }, 100);

    cardCourseMobile.classList.add("displayNone");
    cardCourseProgrammingBasis.classList.add("displayNone");
    cardCourseDataScience.classList.add("displayNone");

    coursePageSwitch(page1Courses, page2Courses);
  } else {
    cardCourseFrontEnd.classList.add("displayNone");
    cardCourseBackEnd.classList.add("displayNone");
    cardCourseUiAndUx.classList.add("displayNone");

    cardCourseMobile.classList.remove("displayNone");
    cardCourseProgrammingBasis.classList.remove("displayNone");
    cardCourseDataScience.classList.remove("displayNone");

    cardCourseMobile.classList.add("animationSlideToTop");
    setTimeout(() => {
      cardCourseDataScience.classList.add("animationSlideToTop");
    }, 50);
    setTimeout(() => {
      cardCourseProgrammingBasis.classList.add("animationSlideToTop");
    }, 100);

    coursePageSwitch(page2Courses, page1Courses);
  }
}

function coursePageSwitch(pageToSelect, pageToUnselect) {
  pageToSelect.classList.remove("animationCoursePageSelected", "animationCoursePageNotSelected");
  pageToUnselect.classList.remove("animationCoursePageSelected", "animationCoursePageNotSelected");

  void pageToSelect.offsetWidth;
  void pageToUnselect.offsetWidth;

  pageToSelect.classList.add("animationCoursePageSelected");
  setTimeout(() => {
    pageToSelect.classList.remove("notSelectedPageCourse");
    pageToSelect.classList.add("selectedPageCourses");
  }, 300);

  pageToUnselect.classList.add("animationCoursePageNotSelected");
  setTimeout(() => {
    pageToUnselect.classList.remove("selectedPageCourses");
    pageToUnselect.classList.add("notSelectedPageCourse");
  }, 300);
}

function goToLogin(){
  window.location.href = "http://127.0.0.1:3000/Login/login.html";
}

function goToRegister(){
  window.location.href = "http://127.0.0.1:3000/Register/register.html";
}

function goToViewReviews(){
  window.location.href = "http://127.0.0.1:3000/#viewReviewsSection"
}

function goToAboutUs(){
  window.location.href = "http://127.0.0.1:3000/#footer";
}
