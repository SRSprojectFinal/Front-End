let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let professors = JSON.parse(localStorage.getItem("userList") || []);
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
  window.location.href = "http://127.0.0.1:3000";
}


let tbodyColor;
let tbodyCount = 0;

function updateProfessor(){

    if(professors != null){

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

            if(professor.regUserEmail.includes("@professor.srs.edu")){
                tbody.innerHTML += `
                <tr class="${tbodyColor}">
                    <td>${professor.regName.split(" ")[0]}</td>
                    <td class="userEmail">${professor.regUserEmail}</td>
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
        const professorToDelete = userEmailToDelete.textContent.trim();              

        professors = professors.filter(professor => professor.regUserEmail !== professorToDelete);
        localStorage.setItem("userList", JSON.stringify(professors));
        updateProfessor()
    });
});

updateProfessor()