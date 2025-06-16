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


// data base history simulation //

let dbHistorySimulation = [
  {
    "email": "juan.santos@student.srs.edu",
    "course": "dataScience",
    "situation": "Approved"
  },
  {
    "email": "juan.santos@student.srs.edu",
    "course": "backEnd",
    "situation": "failed"
  },
  {
    "email": "bruno.ribeiro@student.srs.edu",
    "course": "frontEnd",
    "situation": "failed"
  },
  {
    "email": "bruno.ribeiro@student.srs.edu",
    "course": "mobile",
    "situation": "Approved"
  }
]

// ============================= //

// Simulated dataBase interation //

let studentFind = dbHistorySimulation.filter(student => student.email === loggedUser.email);

studentFind.forEach(student => {

    if(student.course == "frontEnd"){
        pictureURL = frontEndPicture
        bigPictureURL = frontEndBigPicture
    } else if (student.course == "backEnd"){
        pictureURL = backEndPicture
        bigPictureURL = backEndBigPicture
    } else if (student.course == "dataScience"){
        pictureURL = dataSciencePicture
        bigPictureURL = dataScienceBigPicture
    } else if (student.course == "mobile"){
        pictureURL = mobilePicture
        bigPictureURL = mobileBigPicture
    } else if (student.course == "programmingBasis"){
        pictureURL = programmingBasisPictute
        bigPictureURL = programmingBasisBigPicture
    } else if (student.course == "uiAndUx"){
        pictureURL = uiAndUxPictures
        bigPictureURL = uiAndUxBigPicture
    }

    if(student.situation == "Approved"){
        main.innerHTML += `
            <div class="card">
                <div class="cardInformations">
                    <img src=${pictureURL} alt="Course picture">
                    <h2 class="courseName">${student.course}</h2>
                    <h3>Schedule</h3>
                    <p><strong>Days of week:</strong> Tuesday / Thursday</p>
                    <p><strong>Shift:</strong> Morning</p>
                    <p><strong>Time:</strong> 8hrs - 11hrs</p>
                    <h3>Final Situation</h3>
                    <p class="finalSituation approvedSituation"><strong>Situation:</strong> ${student.situation}</p>
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
                    <h2 class="courseName">${student.course}</h2>
                    <h3>Schedule</h3>
                    <p><strong>Days of week:</strong> Tuesday / Thursday</p>
                    <p><strong>Shift:</strong> Morning</p>
                    <p><strong>Time:</strong> 8hrs - 11hrs</p>
                    <h3>Final Situation</h3>
                    <p class="finalSituation failedSituation"><strong>Situation:</strong> ${student.situation}</p>
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



// ============================= //

let loggedName = loggedUser.userName;
const firstNameLoggedUser = loggedName.split(" ")[0];

let account = document.querySelector(".account");
account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "http://127.0.0.1:3000";
}