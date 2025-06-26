let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let professors = [];
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");

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


async function fetchProfessors() {
    try {
        const response = await fetch('http://localhost:8080/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
            professors = data.usuarios.filter(user => user.tipoUsuario === "PROFESSOR");
            updateProfessor();
        } else {
            console.error('Erro ao buscar usuários:', data.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

let tbodyColor;
let tbodyCount = 0;

function updateProfessor(){
    tbody.innerHTML = '';
    tbodyCount = 0;

    if(professors != null && professors.length > 0){

        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Delete Account</th>
            </tr>
        `
        professors.forEach(professor => {

            if(tbodyCount % 2 == 0){
                tbodyColor = "grayBackground"
            } else {
                tbodyColor = "darkGrayBackground"
            }

            tbody.innerHTML += `
            <tr class="${tbodyColor}">
                <td>${professor.nomeCompleto.split(" ")[0]}</td>
                <td class="userEmail">${professor.emailEducacional}</td>
                <td><button class="deleteAccountButton">Delete</button></td>
            </tr>
            `;
            tbodyCount++;
        });

        addDeleteEventListeners();
    } else {
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Delete Account</th>
            </tr>
        `;
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Nenhum professor encontrado</td></tr>';
    }
}

function addDeleteEventListeners() {
    const deleteAccountButtons = document.querySelectorAll(".deleteAccountButton");
    deleteAccountButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const tr = event.target.closest("tr");
            const userEmailToDelete = tr.querySelector(".userEmail");
            const professorToDelete = userEmailToDelete.textContent.trim();              

            try {
                const response = await fetch(`http://localhost:8080/usuarios/${encodeURIComponent(professorToDelete)}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.success) {
                    professors = professors.filter(professor => professor.emailEducacional !== professorToDelete);
                    
                    updateProfessor();
                    
                    console.log('Professor deletado com sucesso:', data.message);
                } else {
                    console.error('Erro ao deletar professor:', data.message);
                    alert('Erro ao deletar professor: ' + data.message);
                }
            } catch (error) {
                console.error('Erro na requisição de delete:', error);
                alert('Erro ao deletar professor. Tente novamente.');
            }
        });
    });
}


fetchProfessors();