let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let professors = JSON.parse(localStorage.getItem("userList") || []);

let animationTriggered = false;

let ministeringFrontEnd = true;
let ministeringBackEnd = true;
let ministeringMobile = true;
let ministeringDataScience = true;
let ministeringUIandUX = true;
let ministeringProgrammingBasis = true;

const upperCardMinistering = document.querySelector(".cardMinistering");

const cardFrontEnd = document.querySelector(".cardFrontEnd");
const frontProgressBar = document.querySelector(".frontProgressBar");
const frontValue = document.querySelector(".frontValue");
const frontCompletedText = document.querySelector(".frontCompletedText");

const cardBackEnd = document.querySelector(".cardBackEnd");
const backProgressBar = document.querySelector(".backProgressBar");
const backValue = document.querySelector(".backValue");
const backCompletedText = document.querySelector(".backCompletedText");

const cardMobile = document.querySelector(".cardMobile");
const mobileProgressBar = document.querySelector(".mobileProgressBar");
const mobileValue = document.querySelector(".mobileValue");
const mobileCompletedText = document.querySelector(".mobileCompletedText");

const cardDataScience = document.querySelector(".cardDataScience");
const dataScienceProgressBar = document.querySelector(".dataScienceProgressBar");
const dataScienceValue = document.querySelector(".dataScienceValue");
const dataScienceCompletedText = document.querySelector(".dataScienceCompletedText");

const cardUIandUX = document.querySelector(".cardUiandUx");
const uiandUxProgressBar = document.querySelector(".uiandUxProgressBar");
const uiandUxValue = document.querySelector(".uiandUxValue");
const uiandUxCompletedText = document.querySelector(".uiandUxCompletedText");

const cardProgrammingBasis = document.querySelector(".cardProgrammingBasis");
const programmingBasisProgressBar = document.querySelector(".programmingBasisProgressBar");
const programmingBasisValue = document.querySelector(".programmingBasisValue");
const programmingBasisCompletedText = document.querySelector(".programmingBasisCompletedText");



let loggedName = loggedUser.userName;
const firstNameLoggedUser = loggedName.split(" ")[0];

let cardProfessorName = document.querySelector(".cardProfessorName");
let account = document.querySelector(".account");
account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;
cardProfessorName.innerHTML = firstNameLoggedUser;

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "http://127.0.0.1:3000";
}



function animateProgress(value, progressBar, completedText, finalValue) {
    let initialProgress = 0;
    let finalProgress = finalValue;

    let progress = setInterval(() => {
        value.textContent = `${initialProgress}%`;
        progressBar.style.background = `conic-gradient(#7B1CE0 ${initialProgress * 3.6}deg, #d8d8d8 0deg)`;

        if (initialProgress === finalProgress) {
            clearInterval(progress);
        };

        if(initialProgress === 0) {
            value.style.color = "#d8d8d8";
            progressBar.style.color = "#d8d8d8";
            completedText.style.color = "#d8d8d8";
        }

        if(initialProgress > 0 && initialProgress < 100) {
            value.style.color = "#7B1CE0";
            progressBar.style.color = "#7B1CE0";
            completedText.style.color = "#7B1CE0";
        }

        if (initialProgress === 100) {
            value.style.color = "#2FAE28";
            progressBar.style.background = `conic-gradient(#2FAE28 360deg, #d8d8d8 0deg)`;
            completedText.style.color = "#2FAE28";
        }

        initialProgress++;
    }, 30);
}


function timerAnimations() {
const h1ProfessorHeader = document.querySelector(".h1ProfessorHeader");
const h1SectionHeader = document.querySelector(".h1SectionHeader");
const hashTag = document.querySelector(".hashTag");
const htmlReference = document.querySelector(".htmlReference");
const cardProfessor = document.querySelector(".cardProfessor");
const cardMinistering = document.querySelector(".cardMinistering");

setTimeout(() => {
  h1ProfessorHeader.classList.remove("typingEffect2");
  h1SectionHeader.classList.remove("invisible");
  h1SectionHeader.classList.add("typingEffect");
}, 2000);

setTimeout(() => {
    hashTag.classList.remove("invisible");
    hashTag.classList.add("slideToRight");

    htmlReference.classList.remove("invisible");
    htmlReference.classList.add("slideToLeft");

    cardProfessor.classList.remove("invisible");
    cardProfessor.classList.add("slideToBottom1");

    cardMinistering.classList.remove("invisible");
    cardMinistering.classList.add("slideToBottom2");
}, 4500);

setTimeout(() => {
    h1SectionHeader.classList.remove("typingEffect");
}, 9000);

}

timerAnimations();

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const sectionPosition = document.querySelector("#ProfessorSection").offsetTop + 500;

    if (scrollPosition >= sectionPosition && !animationTriggered) {
        animationTriggered = true;

        animateProgress(frontValue, frontProgressBar, frontCompletedText, 75);
        animateProgress(backValue, backProgressBar, backCompletedText, 100);
        animateProgress(mobileValue, mobileProgressBar, mobileCompletedText, 0);
        animateProgress(dataScienceValue, dataScienceProgressBar, dataScienceCompletedText, 0);
        animateProgress(uiandUxValue, uiandUxProgressBar, uiandUxCompletedText, 0);
        animateProgress(programmingBasisValue, programmingBasisProgressBar, programmingBasisCompletedText, 0);
    }
});

const cardsProfessor = [
    { condition: ministeringFrontEnd, card: cardFrontEnd , name: "Front End" },
    { condition: ministeringBackEnd, card: cardBackEnd , name: "Back End" },
    { condition: ministeringMobile, card: cardMobile , name: "Mobile" },
    { condition: ministeringDataScience, card: cardDataScience , name: "Data Science" },
    { condition: ministeringUIandUX, card: cardUIandUX , name: "UI & UX" },
    { condition: ministeringProgrammingBasis, card: cardProgrammingBasis , name: "Programming Basis" }
];

cardsProfessor.forEach(({ condition, card, name }) => {
    if (!condition){
        card.style.display = "none";
    } else {
        upperCardMinistering.innerHTML += `<p>${name}</p>`;
    }
});

function goToFrontEndTable() {
    window.location.href = "http://127.0.0.1:3000/ProfessorSection/FrontEndTable/frontEndTable.html"
}

function goToBackEndTable() {
    window.location.href = "http://127.0.0.1:3000/ProfessorSection/BackEndTable/backEndTable.html"
}

function goToMobileTable() {
    window.location.href = "http://127.0.0.1:3000/ProfessorSection/MobileTable/mobileTable.html"
}

function goToDataScienceTable() {
    window.location.href = "http://127.0.0.1:3000/ProfessorSection/DataScienceTable/dataScienceTable.html"
}

function goToProgrammingBasisTable() {
    window.location.href = "http://127.0.0.1:3000/ProfessorSection/ProgrammingBasisTable/programmingBasisTable.html"
}

function goToUiAndUxTable() {
    window.location.href = "http://127.0.0.1:3000/ProfessorSection/UiAndUxTable/uiAndUxTable.html"
}