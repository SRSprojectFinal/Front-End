let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

let main = document.querySelector("main");


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
    if(student.situation == "Approved"){
        main.innerHTML += `
            <div class="card">
                <div class="cardInformations">
                    <img src="StudentHistoryPictures/skill-icons--react-dark.png" alt="Course picture">
                    <h2 class="courseName">${student.course}</h2>
                    <h3>Schedule</h3>
                    <p><strong>Days of week:</strong> Tuesday / Thursday</p>
                    <p><strong>Shift:</strong> Morning</p>
                    <p><strong>Time:</strong> 8hrs - 11hrs</p>
                    <h3>Final Situation</h3>
                    <p class="finalSituation approvedSituation"><strong>Situation:</strong> ${student.situation}</p>
                </div>
                <div class="cardImg">
                    <img src="StudentHistoryPictures/software-developer-6521720_1920.jpg" alt="Course Icon">
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
                    <img src="StudentHistoryPictures/skill-icons--react-dark.png" alt="Course picture">
                    <h2 class="courseName">${student.course}</h2>
                    <h3>Schedule</h3>
                    <p><strong>Days of week:</strong> Tuesday / Thursday</p>
                    <p><strong>Shift:</strong> Morning</p>
                    <p><strong>Time:</strong> 8hrs - 11hrs</p>
                    <h3>Final Situation</h3>
                    <p class="finalSituation failedSituation"><strong>Situation:</strong> ${student.situation}</p>
                </div>
                <div class="cardImg">
                    <img src="StudentHistoryPictures/software-developer-6521720_1920.jpg" alt="Course Icon">
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