let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let students = JSON.parse(localStorage.getItem("userList") || []);
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


let tbodyColor;
let tbodyCount = 0;

function updateStudents(){

    if(students != null){

        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Delete Account</th>
            </tr>
        `
        students.forEach(student => {

            if(tbodyCount % 2 == 0){
                tbodyColor = "grayBackground"
            } else {
                tbodyColor = "darkGrayBackground"
            }

            if(student.regUserEmail.includes("@student.srs.edu")){
                tbody.innerHTML += `
                <tr class="${tbodyColor}">
                    <td>${student.regName.split(" ")[0]}</td>
                    <td class="userEmail">${student.regUserEmail}</td>
                    <td><button class="deleteAccountButton">Delete</button></td>
                </tr>
                `;
                tbodyCount++;
            }
        });
    }
}

const deleteAccountButton = document.querySelectorAll(".deleteAccountButton");
deleteAccountButton.forEach((button) => {
    button.addEventListener("click", (event) => {
        const tr = event.target.closest("tr");
        const userEmailToDelete = tr.querySelector(".userEmail");
        const studentToDelete = userEmailToDelete.textContent.trim();              

        students = students.filter(student => student.regUserEmail !== studentToDelete);
        localStorage.setItem("userList", JSON.stringify(students));
        updateStudents()
    });
});

updateStudents()