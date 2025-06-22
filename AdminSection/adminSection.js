function timerAnimations() {
const h1AdminHeader = document.querySelector(".h1AdminHeader");
const h1SectionHeader = document.querySelector(".h1SectionHeader");
const hashTag = document.querySelector(".hashTag");
const htmlReference = document.querySelector(".htmlReference");

setTimeout(() => {
  h1AdminHeader.classList.remove("typingEffect");
  h1SectionHeader.classList.remove("invisible");
  h1SectionHeader.classList.add("typingEffect");
}, 2000);

setTimeout(() => {
    hashTag.classList.remove("invisible");
    hashTag.classList.add("slideToRight");

    htmlReference.classList.remove("invisible");
    htmlReference.classList.add("slideToLeft");

}, 4500);

setTimeout(() => {
    h1SectionHeader.classList.remove("typingEffect");
}, 9000);

}

timerAnimations();

function goToManageStudents() {
  window.location.href = "http://127.0.0.1:3000/AdminSection/ManageStudents/manageStudents.html"
}

function goToManageProfessor() {
  window.location.href = "http://127.0.0.1:3000/AdminSection/ManageProfessor/manageProfessor.html"
}

function goToManageSchedule() {
  window.location.href = "http://127.0.0.1:3000/AdminSection/ManageSchedule/manageSchedule.html"
}

function goToAddProfessor() {
  window.location.href = "http://127.0.0.1:3000/AdminSection/AddProfessor/addProfessor.html"
}