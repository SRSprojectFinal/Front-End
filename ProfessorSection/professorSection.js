const frontProgressBar = document.querySelector(".frontProgressBar");
const frontValue = document.querySelector(".frontValue");
const frontCompletedText = document.querySelector(".frontCompletedText");

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
animateProgress(frontValue, frontProgressBar, frontCompletedText, 75);