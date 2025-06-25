let studentScheduleDb = [];

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
  window.location.href = "http://localhost:3000";
}

// Função para buscar alunos do backend
async function fetchStudentsFromBackend() {
  try {
    const response = await fetch('http://localhost:8080/cursos/programming/alunos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    studentScheduleDb = data;
    updateStudents();
  } catch (error) {
    console.error('Erro ao buscar alunos do backend:', error);
    // Em caso de erro, mostrar mensagem na tabela
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
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Erro ao carregar dados do servidor</td></tr>';
  }
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

  if (studentScheduleDb.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Nenhum aluno encontrado</td></tr>';
    return;
  }

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

// Inicializar buscando dados do backend
fetchStudentsFromBackend();