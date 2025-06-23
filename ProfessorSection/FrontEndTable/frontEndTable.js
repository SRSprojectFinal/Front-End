const studentScheduleDb = [
  { email: "ana.silva@student.srs.edu", TP1: "D", TP2: "DL", TP3: "DML", AT: "D" },
  { email: "bruno.souza@student.srs.edu", TP1: "DL", TP2: "ND", TP3: "D", AT: null },
  { email: "carla.oliveira@student.srs.edu", TP1: "ND", TP2: "D", TP3: "DL", AT: "DML" },
  { email: "daniel.costa@student.srs.edu", TP1: "D", TP2: "D", TP3: "ND", AT: "DL" },
  { email: "elisa.ferreira@student.srs.edu", TP1: "DML", TP2: "D", TP3: "D", AT: "ND" },
  { email: "felipe.almeida@student.srs.edu", TP1: "DL", TP2: "DL", TP3: "D", AT: "D" },
  { email: "gabriela.ramos@student.srs.edu", TP1: "ND", TP2: "ND", TP3: "DML", AT: null },
  { email: "henrique.martins@student.srs.edu", TP1: "D", TP2: "DML", TP3: "DL", AT: "DML" },
  { email: "isabela.lima@student.srs.edu", TP1: "DL", TP2: "DL", TP3: "DML", AT: "ND" },
  { email: "joao.pereira@student.srs.edu", TP1: "D", TP2: "D", TP3: "D", AT: null }
];

let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || { userName: "João Professor" };
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const account = document.querySelector(".account");
const firstNameLoggedUser = loggedUser.userName.split(" ")[0];
account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "http://127.0.0.1:3000";
}

function updateStudents() {
  thead.innerHTML = `
    <tr>
      <th>Student E-mail</th>
      <th>TP1</th>
      <th>TP2</th>
      <th>TP3</th>
      <th>AT</th>
      <th>Situation</th>
      <th>Edit Notes</th>
    </tr>
  `;

  tbody.innerHTML = "";
  let tbodyCount = 0;

  studentScheduleDb.forEach(student => {
    const schedule = [student.TP1, student.TP2, student.TP3, student.AT];
    let situationText = "Approved";
    let situationClass = "positiveNote";

    if (schedule.includes("ND")) {
      situationText = "Failed";
      situationClass = "negativeNote";
    } else if (schedule.includes(null)) {
      situationText = "Ongoing";
      situationClass = "ongoingTd";
    }

    if(tbodyCount % 2 === 0) {
        tdColor = "grayBackground";
    } else {
        tdColor = "darkGrayBackground";
    }

    function formatGrade(schedule) {
      if (schedule === null) {
        return `<td class="emptyTd">-</td>`
      };
      if (schedule === "ND") {
        return `<td class="negativeNote">${schedule}</td>`
      };
      
      return `<td class="positiveNote">${schedule}</td>`;
    }

    tbody.innerHTML += `
      <tr class="${tdColor}">
        <td class="userEmail">${student.email}</td>
        ${formatGrade(student.TP1)}
        ${formatGrade(student.TP2)}
        ${formatGrade(student.TP3)}
        ${formatGrade(student.AT)}
        <td class="${situationClass}">${situationText}</td>
        <td><button class="editNotesButton">Edit</button></td>
      </tr>
    `;

    tbodyCount++;
  });
}

updateStudents();