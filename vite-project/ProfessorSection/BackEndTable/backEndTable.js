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

async function fetchStudentsFromBackend() {
  try {
    const response = await fetch('http://localhost:8080/cursos/backend/alunos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Dados recebidos do backend:', data);
    studentScheduleDb = data;
    updateStudents();
  } catch (error) {
    console.error('Erro ao buscar alunos do backend:', error);
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

  studentScheduleDb.forEach((student, index) => {
    console.log(`Aluno ${index}:`, student);
    console.log(`Notas do aluno ${index}:`, { TP1: student.tp1, TP2: student.tp2, TP3: student.tp3, AT: student.assesment });
    
    const schedule = [student.tp1, student.tp2, student.tp3, student.assesment];
    let situationText = "Approved";
    let situationClass = "positiveNote";

    if (schedule.includes("ND")) {
      situationText = "Failed";
      situationClass = "negativeNote";
    } else if (schedule.includes(null) || schedule.includes(undefined) || schedule.includes("")) {
      situationText = "Ongoing";
      situationClass = "ongoingTd";
    }

    console.log(`Situação calculada para aluno ${index}:`, situationText);

    if(tbodyCount % 2 === 0) {
        tdColor = "grayBackground";
    } else {
        tdColor = "darkGrayBackground";
    }

    function formatGrade(schedule) {
      console.log(`Formatando nota: "${schedule}" (tipo: ${typeof schedule})`);
      if (schedule === null || schedule === undefined || schedule === "") {
        console.log(`Nota "${schedule}" será exibida como "-"`);
        return `<td class="emptyTd">-</td>`
      };
      if (schedule === "ND") {
        console.log(`Nota "${schedule}" será exibida como ND (vermelho)`);
        return `<td class="negativeNote">${schedule}</td>`
      };
      
      console.log(`Nota "${schedule}" será exibida como positiva (verde)`);
      return `<td class="positiveNote">${schedule}</td>`;
    }

    tbody.innerHTML += `
      <tr class="${tdColor}" data-student-index="${index}">
        <td class="userEmail">${student.email}</td>
        ${formatGrade(student.tp1)}
        ${formatGrade(student.tp2)}
        ${formatGrade(student.tp3)}
        ${formatGrade(student.assesment)}
        <td class="${situationClass}">${situationText}</td>
        <td><button class="editNotesButton" onclick="toggleEditMode(${index})">Edit</button></td>
      </tr>
    `;

    tbodyCount++;
  });
}

function toggleEditMode(studentIndex) {
  const row = document.querySelector(`tr[data-student-index="${studentIndex}"]`);
  const button = row.querySelector('.editNotesButton');
  const isEditing = button.textContent === 'Save';
  
  if (isEditing) {
    saveGrades(studentIndex);
  } else {
    enterEditMode(studentIndex);
  }
}

function enterEditMode(studentIndex) {
  const row = document.querySelector(`tr[data-student-index="${studentIndex}"]`);
  const student = studentScheduleDb[studentIndex];
  
  const tp1Cell = row.children[1];
  const tp2Cell = row.children[2];
  const tp3Cell = row.children[3];
  const atCell = row.children[4];
  
  tp1Cell.innerHTML = createGradeDropdown('tp1', student.tp1);
  tp2Cell.innerHTML = createGradeDropdown('tp2', student.tp2);
  tp3Cell.innerHTML = createGradeDropdown('tp3', student.tp3);
  atCell.innerHTML = createGradeDropdown('assesment', student.assesment);
  
  const button = row.querySelector('.editNotesButton');
  button.textContent = 'Save';
  button.classList.add('saveButton');
}

// Função para criar dropdown de notas
function createGradeDropdown(fieldName, currentValue) {
  const options = ['', 'ND', 'D', 'DL', 'DML'];
  let selectedValue = currentValue || '';
  
  return `
    <select class="grade-dropdown" data-field="${fieldName}">
      ${options.map(option => 
        `<option value="${option}" ${option === selectedValue ? 'selected' : ''}>
          ${option === '' ? '-' : option}
        </option>`
      ).join('')}
    </select>
  `;
}

async function saveGrades(studentIndex) {
  const row = document.querySelector(`tr[data-student-index="${studentIndex}"]`);
  const student = studentScheduleDb[studentIndex];
  const button = row.querySelector('.editNotesButton');
  
  const tp1 = row.querySelector('select[data-field="tp1"]').value;
  const tp2 = row.querySelector('select[data-field="tp2"]').value;
  const tp3 = row.querySelector('select[data-field="tp3"]').value;
  const assesment = row.querySelector('select[data-field="assesment"]').value;
  
  const tp1Value = tp1 === '' ? null : tp1;
  const tp2Value = tp2 === '' ? null : tp2;
  const tp3Value = tp3 === '' ? null : tp3;
  const assesmentValue = assesment === '' ? null : assesment;
  
  try {
    await updateGrade('tp1', student.email, tp1Value);
    await updateGrade('tp2', student.email, tp2Value);
    await updateGrade('tp3', student.email, tp3Value);
    await updateGrade('assessment', student.email, assesmentValue);
    
    studentScheduleDb[studentIndex].tp1 = tp1Value;
    studentScheduleDb[studentIndex].tp2 = tp2Value;
    studentScheduleDb[studentIndex].tp3 = tp3Value;
    studentScheduleDb[studentIndex].assesment = assesmentValue;
    
    alert('Notas atualizadas com sucesso!');
    
    updateStudents();
    
  } catch (error) {
    console.error('Erro ao salvar notas:', error);
    alert('Erro ao salvar notas. Tente novamente.');
  }
}

async function updateGrade(gradeType, email, grade) {
  const endpoint = `http://localhost:8080/cursos/backend/atualizar/${gradeType}`;
  
  console.log(`Enviando atualização para ${endpoint}:`, { email, [gradeType]: grade });
  
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      [gradeType]: grade
    })
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const result = await response.json();
  console.log(`Resposta da atualização ${gradeType}:`, result);
  
  return result;
}

function exitEditMode(studentIndex) {
  const row = document.querySelector(`tr[data-student-index="${studentIndex}"]`);
  const student = studentScheduleDb[studentIndex];
  
  const tp1Cell = row.children[1];
  const tp2Cell = row.children[2];
  const tp3Cell = row.children[3];
  const atCell = row.children[4];
  
  tp1Cell.innerHTML = formatGradeForDisplay(student.tp1);
  tp2Cell.innerHTML = formatGradeForDisplay(student.tp2);
  tp3Cell.innerHTML = formatGradeForDisplay(student.tp3);
  atCell.innerHTML = formatGradeForDisplay(student.assesment);
  
  const situationCell = row.children[5];
  const schedule = [student.tp1, student.tp2, student.tp3, student.assesment];
  let situationText = "Approved";
  let situationClass = "positiveNote";

  if (schedule.includes("ND")) {
    situationText = "Failed";
    situationClass = "negativeNote";
  } else if (schedule.includes(null) || schedule.includes(undefined) || schedule.includes("")) {
    situationText = "Ongoing";
    situationClass = "ongoingTd";
  }
  
  situationCell.className = situationClass;
  situationCell.textContent = situationText;
  
 
  const button = row.querySelector('.editNotesButton');
  button.textContent = 'Edit';
  button.classList.remove('saveButton');
}

function formatGradeForDisplay(grade) {
  if (grade === null || grade === undefined || grade === "") {
    return '<span class="emptyTd">-</span>';
  }
  if (grade === "ND") {
    return `<span class="negativeNote">${grade}</span>`;
  }
  return `<span class="positiveNote">${grade}</span>`;
}

function podeFinalizarTurma() {
  return studentScheduleDb.length > 0 && studentScheduleDb.every(aluno =>
    aluno.tp1 !== null && aluno.tp1 !== undefined && aluno.tp1 !== "" &&
    aluno.tp2 !== null && aluno.tp2 !== undefined && aluno.tp2 !== "" &&
    aluno.tp3 !== null && aluno.tp3 !== undefined && aluno.tp3 !== "" &&
    aluno.assesment !== null && aluno.assesment !== undefined && aluno.assesment !== ""
  );
}

async function finalizarTurma() {
  if (!podeFinalizarTurma()) {
    alert("Não é possível finalizar a turma: todos os alunos devem ter todas as notas atribuídas.");
    return;
  }

  for (const aluno of studentScheduleDb) {
    const situacao = calcularSituacaoAluno(aluno);
    await fetch("http://localhost:8080/historico/adicionar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailEducacional: aluno.email,
        curso: "Back-End",
        situacao: situacao
      })
    });
  }

  const resp = await fetch("http://localhost:8080/cursos/backend/remover-todos", { method: "DELETE" });
  if (resp.ok) {
    alert("Turma finalizada com sucesso!");
    studentScheduleDb = [];
    updateStudents();
  } else {
    alert("Erro ao remover alunos do curso.");
  }
}


function calcularSituacaoAluno(aluno) {
  const schedule = [aluno.tp1, aluno.tp2, aluno.tp3, aluno.assesment];
  if (schedule.includes("ND")) return "Failed";
  if (schedule.includes(null) || schedule.includes(undefined) || schedule.includes("")) return "Ongoing";
  return "Approved";
}

window.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("finalizarTurmaBtn");
  if (btn) btn.addEventListener("click", finalizarTurma);
});


fetchStudentsFromBackend();