document.addEventListener("DOMContentLoaded", function () {
  const rawLoggedUser = localStorage.getItem("loggedUser");
  let loggedUser = null;

  if (rawLoggedUser) {
    try {
      loggedUser = JSON.parse(rawLoggedUser);
    } catch (e) {
      console.error("Erro ao fazer parse do loggedUser:", e);
    }
  }

  if (!loggedUser) {
    alert("Usuário não logado. Redirecionando para login.");
    window.location.href = "http://localhost:3000";
    return;
  }

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

  let account = document.querySelector(".account");
  if (account) {
    let loggedName = loggedUser.userName;
    const firstNameLoggedUser = loggedName.split(" ")[0];
    account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;
  }

  const courseMapping = {
    "Front-End": { professorField: frontEndProfessor, manageField: frontEndManage },
    "Back-End": { professorField: backEndProfessor, manageField: backEndManage },
    "Mobile": { professorField: mobileProfessor, manageField: mobileManage },
    "UI_UX": { professorField: uiAndUxProfessor, manageField: uiAndUxManage },
    "Data-Science": { professorField: dataScienceProfessor, manageField: dataScienceManage },
    "Programming-Basis": { professorField: programmingBasisProfessor, manageField: programmingBasisManage }
  };

  let gradeData = [];
  let professores = [];

  async function loadGradeData() {
    try {
      const response = await fetch('http://localhost:8080/grade');
      const data = await response.json();
      
      if (data.success) {
        gradeData = data.grade;
        updateTable();
      } else {
        console.error('Erro ao carregar grade:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  async function loadProfessores() {
    try {
      const response = await fetch('http://localhost:8080/usuarios');
      const data = await response.json();
      
      if (data.success) {
        const professoresCompletos = data.usuarios.filter(user => user.tipoUsuario === 'PROFESSOR');
        professores = professoresCompletos.map(user => ({
          nome: user.nomeCompleto.split(' ')[0].trim(),
          emailEducacional: user.emailEducacional
        }));
        console.log('Usuários filtrados (professores):', professoresCompletos);
      } else {
        console.error('Erro ao carregar professores:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  function createOptions(professores) {
    return professores.map(professor => `<option value="${professor.nome}" data-email="${professor.emailEducacional}">${professor.nome}</option>`).join('');
  }

  function updateTable() {
    gradeData.forEach(grade => {
      const courseInfo = courseMapping[grade.curso];
      if (courseInfo) {
        const { professorField, manageField } = courseInfo;
        
        professorField.textContent = grade.professor || '';
        
        if (grade.professor) {
          manageField.innerHTML = `
            <button class="removeProfessorButton" data-curso="${grade.curso}">Remove</button>
          `;
        } else {
          manageField.innerHTML = `
            <form>
              <select class="courseSelect" name="course">
                <option value="" disabled selected>select a professor</option>
                ${createOptions(professores)}
              </select>
              <button type="button" class="buttonSubmitProfessor" data-curso="${grade.curso}">Add</button>
            </form>
          `;
        }
      }
    });

    addEventListeners();
  }

  function addEventListeners() {
    document.querySelectorAll('.buttonSubmitProfessor').forEach(button => {
      button.addEventListener('click', async function() {
        const curso = this.getAttribute('data-curso');
        const select = this.parentElement.querySelector('.courseSelect');
        const professorNome = select.value;
        const professorEmail = select.options[select.selectedIndex].getAttribute('data-email');
        
        if (professorNome && professorEmail) {
          await addProfessor(curso, professorNome, professorEmail);
        }
      });
    });


    document.querySelectorAll('.removeProfessorButton').forEach(button => {
      button.addEventListener('click', async function() {
        const curso = this.getAttribute('data-curso');
        await removeProfessor(curso);
      });
    });
  }


  async function addProfessor(curso, professor, email) {
    try {
      const response = await fetch('http://localhost:8080/grade/atribuir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ curso, professor, email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Professor atribuído com sucesso!');
        await loadGradeData();
      } else {
        alert('Erro ao atribuir professor: ' + data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor');
    }
  }


  async function removeProfessor(curso) {
    try {
      const response = await fetch(`http://localhost:8080/grade/remover/${curso}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Professor removido com sucesso!');
        await loadGradeData();
      } else {
        alert('Erro ao remover professor: ' + data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor');
    }
  }


  async function initialize() {
    await loadProfessores();
    await loadGradeData();
  }

  initialize();
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "http://localhost:3000";
}
