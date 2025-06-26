let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

let main = document.querySelector("main");

let pictureURL;
let frontEndPicture = "StudentHistoryPictures/skill-icons--react-dark.png"
let backEndPicture = "StudentHistoryPictures/skill-icons--python-dark.png"
let dataSciencePicture = "StudentHistoryPictures/skill-icons--mysql-light.png"
let mobilePicture = "StudentHistoryPictures/skill-icons--swift.png"
let programmingBasisPictute = "StudentHistoryPictures/skill-icons--vscode-dark.png"
let uiAndUxPictures = "StudentHistoryPictures/skill-icons--figma-dark.png"

let bigPictureURL;
let frontEndBigPicture = "StudentHistoryPictures/software-developer-6521720_1920.jpg"
let backEndBigPicture = "StudentHistoryPictures/code-4333398_1920.jpg"
let mobileBigPicture = "StudentHistoryPictures/pexels-olly-914931.jpg"
let dataScienceBigPicture = "StudentHistoryPictures/pexels-divinetechygirl-1181316.jpg"
let uiAndUxBigPicture = "StudentHistoryPictures/pexels-tranmautritam-326518.jpg"
let programmingBasisBigPicture = "StudentHistoryPictures/pexels-thisisengineering-3861969.jpg"

function fetchStudentHistory() {
    fetch(`http://localhost:8080/historico/buscar/${loggedUser.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar histórico');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            displayStudentHistory(data);
        } else if (data.status === "nao_encontrado") {
            main.innerHTML = '<p class="no-history">Nenhum histórico encontrado.</p>';
        } else {
            throw new Error(data.mensagem || 'Erro desconhecido');
        }
    })
    .catch(error => {
        main.innerHTML = '<p class="error">Erro ao carregar histórico: ' + error.message + '</p>';
    });
}

function displayStudentHistory(studentHistory) {
    studentHistory.forEach(student => {

        if(student.curso == "Front-End"){
            pictureURL = frontEndPicture
            bigPictureURL = frontEndBigPicture
        } else if (student.curso == "Back-End"){
            pictureURL = backEndPicture
            bigPictureURL = backEndBigPicture
        } else if (student.curso == "Data-Science"){
            pictureURL = dataSciencePicture
            bigPictureURL = dataScienceBigPicture
        } else if (student.curso == "Mobile"){
            pictureURL = mobilePicture
            bigPictureURL = mobileBigPicture
        } else if (student.curso == "Programming-Basis"){
            pictureURL = programmingBasisPictute
            bigPictureURL = programmingBasisBigPicture
        } else if (student.curso == "UI-UX"){
            pictureURL = uiAndUxPictures
            bigPictureURL = uiAndUxBigPicture
        }

        if(student.situacao == "Approved"){
            main.innerHTML += `
                <div class="card">
                    <div class="cardInformations">
                        <img src=${pictureURL} alt="Course picture">
                        <h2 class="courseName">${student.curso}</h2>
                        <h3>Schedule</h3>
                        <p><strong>Days of week:</strong> Tuesday / Thursday</p>
                        <p><strong>Shift:</strong> Morning</p>
                        <p><strong>Time:</strong> 8hrs - 11hrs</p>
                        <h3>Final Situation</h3>
                        <p class="finalSituation approvedSituation"><strong>Situation:</strong> ${student.situacao}</p>
                    </div>
                    <div class="cardImg">
                        <img src=${bigPictureURL} alt="Course Icon">
                    </div>
                    <div class="cardProgress">
                        <h2>Progress</h2>
                        <h3>Course Time</h3>
                        <p><strong>Duration:</strong> 1 year</p>
                        <div class="progressBar progressBarApproved">
                            <div class="value approvedSituation">100%</div>
                            <div class="completedText approvedSituation">Completed</div>
                        </div>        
                    </div>
                </div>
            `;
        } else {
            main.innerHTML += `
                <div class="card">
                    <div class="cardInformations">
                        <img src=${pictureURL} alt="Course picture">
                        <h2 class="courseName">${student.curso}</h2>
                        <h3>Schedule</h3>
                        <p><strong>Days of week:</strong> Tuesday / Thursday</p>
                        <p><strong>Shift:</strong> Morning</p>
                        <p><strong>Time:</strong> 8hrs - 11hrs</p>
                        <h3>Final Situation</h3>
                        <p class="finalSituation failedSituation"><strong>Situation:</strong> ${student.situacao}</p>
                    </div>
                    <div class="cardImg">
                        <img src=${bigPictureURL} alt="Course Icon">
                    </div>
                    <div class="cardProgress">
                        <h2>Progress</h2>
                        <h3>Course Time</h3>
                        <p><strong>Duration:</strong> 1 year</p>
                        <div class="progressBar progressBarFailed">
                            <div class="value failedSituation">100%</div>
                            <div class="completedText failedSituation">Completed</div>
                        </div>        
                    </div>
                </div>
            `;
        }
    });
}

fetchStudentHistory();

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