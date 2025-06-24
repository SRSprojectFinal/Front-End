// Simulated Database //

let simulatedDatabase = ["Bruno", "Marcio", "Miguel", "Igor", "Fernando"];

// ================== //

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let professors = JSON.parse(localStorage.getItem("userList") || []);

let frontEndProfessor = document.querySelector(".frontEndProfessor");
let frontEndManage = document.querySelector(".frontEndManage");

let backEndProfessor = document.querySelector(".backEndProfessor");
let backEndManage = document.querySelector(".backEndManage");

let mobileProfessor = document.querySelector(".mobileProfessor");
let mobileManage = document.querySelector(".mobileManage");

let uiAndUxProfessor = document.querySelector(".uiAndUxProfessor");
let uiAndUxManage = document.querySelector(".uiAndUxManage");

let dataScienceProfessor = document.querySelector(".dataScienceProfessor");
let dataScienceManage = document.querySelector(".dataScienceManage");

let programmingBasisProfessor = document.querySelector(".programmingBasisProfessor");
let programmingBasisManage = document.querySelector(".programmingBasisManage");

let loggedName = loggedUser.userName;
const firstNameLoggedUser = loggedName.split(" ")[0];

let account = document.querySelector(".account");
account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "http://localhost:3000";
}

function createOptions(professors) {
  return professors.map(professor => `<option value="${professor}">${professor}</option>`).join('');
}

const courses = [
  { professorField: frontEndProfessor, manageField: frontEndManage },
  { professorField: backEndProfessor, manageField: backEndManage },
  { professorField: mobileProfessor, manageField: mobileManage },
  { professorField: uiAndUxProfessor, manageField: uiAndUxManage },
  { professorField: dataScienceProfessor, manageField: dataScienceManage },
  { professorField: programmingBasisProfessor, manageField: programmingBasisManage }
];

courses.forEach(({ professorField, manageField }) => {
  if (professorField.innerHTML.trim() === "") {
    manageField.innerHTML = `
      <form>
        <select class="courseSelect" name="course">
          <option value="" disabled selected>select a professor</option>
          ${createOptions(simulatedDatabase)}
        </select>
        <button type="button" class="buttonSubmitProfessor">Add</button>
      </form>
    `;
  } else {
    manageField.innerHTML = `
      <button class="removeProfessorButton">Remove</button>
    `;
  }
});
