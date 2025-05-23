

function timerAnimations() {
const h1StudentHeader = document.querySelector(".h1StudentHeader");
const h1SectionHeader = document.querySelector(".h1SectionHeader");
const hashTag = document.querySelector(".hashTag");
const htmlReference = document.querySelector(".htmlReference");
const cardStudent = document.querySelector(".cardStudent");
const cardStudying = document.querySelector(".cardStudying");

setTimeout(() => {
  h1StudentHeader.classList.remove("typingEffect");
  h1SectionHeader.classList.remove("invisible");
  h1SectionHeader.classList.add("typingEffect");
}, 2000);

setTimeout(() => {
    hashTag.classList.remove("invisible");
    hashTag.classList.add("slideToRight");

    htmlReference.classList.remove("invisible");
    htmlReference.classList.add("slideToLeft");

    cardStudent.classList.remove("invisible");
    cardStudent.classList.add("slideToBottom1");

    cardStudying.classList.remove("invisible");
    cardStudying.classList.add("slideToBottom2");
}, 4500);

setTimeout(() => {
    h1SectionHeader.classList.remove("typingEffect");
}, 9000);

}

timerAnimations();
