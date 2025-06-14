let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

let backEndNotes = document.querySelector(".backEndNotes");
let BackEndTP1 = document.querySelector(".BackEndTP1");
let BackEndTP2 = document.querySelector(".BackEndTP2");
let BackEndTP3 = document.querySelector(".BackEndTP3");
let BackEndAT = document.querySelector(".BackEndAT");
let BackEndSituation = document.querySelector(".BackEndSituation");

let mobileNotes = document.querySelector(".mobileNotes");
let MobileTP1 = document.querySelector(".MobileTP1");
let MobileTP2 = document.querySelector(".MobileTP2");
let MobileTP3 = document.querySelector(".MobileTP3");
let MobileAT = document.querySelector(".MobileAT");
let MobileSituation = document.querySelector(".MobileSituation");

let frontEndNotes = document.querySelector(".frontEndNotes");
let FrontEndTP1 = document.querySelector(".FrontEndTP1");
let FrontEndTP2 = document.querySelector(".FrontEndTP2");
let FrontEndTP3 = document.querySelector(".FrontEndTP3");
let FrontEndAT = document.querySelector(".FrontEndAT");
let FrontEndSituation = document.querySelector(".FrontEndSituation");

let programmingBasisNotes = document.querySelector(".programmingBasisNotes");
let ProgrammingBasisTP1 = document.querySelector(".ProgrammingBasisTP1");
let ProgrammingBasisTP2 = document.querySelector(".ProgrammingBasisTP2");
let ProgrammingBasisTP3 = document.querySelector(".ProgrammingBasisTP3");
let ProgrammingBasisAT = document.querySelector(".ProgrammingBasisAT");
let ProgrammingBasisSituation = document.querySelector(".ProgrammingBasisSituation");

let dataScienceNotes = document.querySelector(".dataScienceNotes");
let DataScienceTP1 = document.querySelector(".DataScienceTP1");
let DataScienceTP2 = document.querySelector(".DataScienceTP2");
let DataScienceTP3 = document.querySelector(".DataScienceTP3");
let DataScienceAT = document.querySelector(".DataScienceAT");
let DataScienceSituation = document.querySelector(".DataScienceSituation");

let uiAndUxNotes = document.querySelector(".uiAndUxNotes");
let UiAndUxTP1 = document.querySelector(".UiAndUxTP1");
let UiAndUxTP2 = document.querySelector(".UiAndUxTP2");
let UiAndUxTP3 = document.querySelector(".UiAndUxTP3");
let UiAndUxAT = document.querySelector(".UiAndUxAT");
let UiAndUxSituation = document.querySelector(".UiAndUxSituation");

// Simulaçao de um banco de dados para as notas dos alunos //

// BackEnd Notes Simulation
let dbBackEndNotesSimulation = [
  {
    "email": "juan.santos@student.srs.edu",
    "TP1": "D",
    "TP2": 'DL',
    "TP3": "DL",
    "AT": "DML"
  },
  {
    "email": "bruno.ribeiro@student.srs.edu",
    "TP1": "D",
    "TP2": 'DL',
    "TP3": "ND",
    "AT": null
  }
]

// Mobile Notes Simulation
let dbMobileNotesSimulation = [
  {
    "email": "juan.santos@student.srs.edu",
    "TP1": "D",
    "TP2": 'DL',
    "TP3": "D",
    "AT": null
  }
]

// FrontEnd Notes Simulation
let dbFrontEndNotesSimulation = [
  {
    "email": "bruno.ribeiro@student.srs.edu",
    "TP1": "D",
    "TP2": 'DL',
    "TP3": "D",
    "AT": "DML"
  }
]

// Programming Basis Notes Simulation
let dbProgrammingBasisNotesSimulation = [
  {
    "email": "juan.santos@student.srs.edu",
    "TP1": "D",
    "TP2": 'DL',
    "TP3": "D",
    "AT": null
  }
]

// Data Science Notes Simulation
let dbDataScienceNotesSimulation = []

// UI and UX Notes Simulation
let dbUiAndUxNotesSimulation = [
  {
    "email": "juan.santos@student.srs.edu",
    "TP1": "D",
    "TP2": 'DL',
    "TP3": null,
    "AT": null
  },
  {
    "email": "bruno.ribeiro@student.srs.edu",
    "TP1": "D",
    "TP2": 'DL',
    "TP3": "ND",
    "AT": "D"
  }
]
  
// ===================================== //

// ForEach to iterate through the notes //

// BackEnd Notes interation //

let backEndStudentFind = dbBackEndNotesSimulation.find(student => student.email === loggedUser.email);

  if (backEndStudentFind) {
    if (backEndStudentFind.TP1 == null) {
      BackEndTP1.innerHTML = "-";
      BackEndTP1.classList.add("emptyTd");

    } else if (backEndStudentFind.TP1 === "D" || backEndStudentFind.TP1 === "DL" || backEndStudentFind.TP1 === "DML") {
      BackEndTP1.innerHTML = backEndStudentFind.TP1;
      BackEndTP1.classList.add("positiveNote");

    } else if (backEndStudentFind.TP1 === "ND") {
      BackEndTP1.innerHTML = backEndStudentFind.TP1;
      BackEndTP1.classList.add("negativeNote");

    }

    if (backEndStudentFind.TP2 == null) {
      BackEndTP2.innerHTML = "-";
      BackEndTP2.classList.add("emptyTd");

    } else if (backEndStudentFind.TP2 === "D" || backEndStudentFind.TP2 === "DL" || backEndStudentFind.TP2 === "DML") {
      BackEndTP2.innerHTML = backEndStudentFind.TP2;
      BackEndTP2.classList.add("positiveNote");

    } else if (backEndStudentFind.TP2 === "ND") {
      BackEndTP2.innerHTML = backEndStudentFind.TP2;
      BackEndTP2.classList.add("negativeNote");

    }

    if (backEndStudentFind.TP3 == null) {
      BackEndTP3.innerHTML = "-";
      BackEndTP3.classList.add("emptyTd");

    } else if (backEndStudentFind.TP3 === "D" || backEndStudentFind.TP3 === "DL" || backEndStudentFind.TP3 === "DML") {
      BackEndTP3.innerHTML = backEndStudentFind.TP3;
      BackEndTP3.classList.add("positiveNote");

    } else if (backEndStudentFind.TP3 === "ND") {
      BackEndTP3.innerHTML = backEndStudentFind.TP3;
      BackEndTP3.classList.add("negativeNote");

    }

    if (backEndStudentFind.AT == null) {
      BackEndAT.innerHTML = "-";
      BackEndAT.classList.add("emptyTd");

    } else if (backEndStudentFind.AT === "D" || backEndStudentFind.AT === "DL" || backEndStudentFind.AT === "DML") {
      BackEndAT.innerHTML = backEndStudentFind.AT;
      BackEndAT.classList.add("positiveNote");

    } else if (backEndStudentFind.AT === "ND") {
      BackEndAT.innerHTML = backEndStudentFind.AT;
      BackEndAT.classList.add("negativeNote");

    }

    if (backEndStudentFind.TP1 == null || backEndStudentFind.TP2 == null || backEndStudentFind.TP3 == null || backEndStudentFind.AT == null) {
      BackEndSituation.innerHTML = "ongoing";
    } else if (backEndStudentFind.TP1 === "ND" || backEndStudentFind.TP2 === "ND" || backEndStudentFind.TP3 === "ND" || backEndStudentFind.AT === "ND") {
      BackEndSituation.innerHTML = "failed";
      BackEndSituation.classList.add("negativeNote");
    } else {
      BackEndSituation.innerHTML = "approved";
      BackEndSituation.classList.add("positiveNote");
    }
    
  } else {
    backEndNotes.style.display = "none";
  }

// ====================================== //

// Mobile Notes interation //

let mobileStudentFind = dbMobileNotesSimulation.find(student => student.email === loggedUser.email);
if (mobileStudentFind) {
  if (mobileStudentFind.TP1 == null) {
    MobileTP1.innerHTML = "-";
    MobileTP1.classList.add("emptyTd");

  } else if (mobileStudentFind.TP1 === "D" || mobileStudentFind.TP1 === "DL" || mobileStudentFind.TP1 === "DML") {
    MobileTP1.innerHTML = mobileStudentFind.TP1;
    MobileTP1.classList.add("positiveNote");

  } else if (mobileStudentFind.TP1 === "ND") {
    MobileTP1.innerHTML = mobileStudentFind.TP1;
    MobileTP1.classList.add("negativeNote");

  }

  if (mobileStudentFind.TP2 == null) {
    MobileTP2.innerHTML = "-";
    MobileTP2.classList.add("emptyTd");

  } else if (mobileStudentFind.TP2 === "D" || mobileStudentFind.TP2 === "DL" || mobileStudentFind.TP2 === "DML") {
    MobileTP2.innerHTML = mobileStudentFind.TP2;
    MobileTP2.classList.add("positiveNote");

  } else if (mobileStudentFind.TP2 === "ND") {
    MobileTP2.innerHTML = mobileStudentFind.TP2;
    MobileTP2.classList.add("negativeNote");

  }

  if (mobileStudentFind.TP3 == null) {
    MobileTP3.innerHTML = "-";
    MobileTP3.classList.add("emptyTd");

  } else if (mobileStudentFind.TP3 === "D" || mobileStudentFind.TP3 === "DL" || mobileStudentFind.TP3 === "DML") {
    MobileTP3.innerHTML = mobileStudentFind.TP3;
    MobileTP3.classList.add("positiveNote");

  } else if (mobileStudentFind.TP3 === "ND") {
    MobileTP3.innerHTML = mobileStudentFind.TP3;
    MobileTP3.classList.add("negativeNote");

  }

  if (mobileStudentFind.AT == null) {
    MobileAT.innerHTML = "-";
    MobileAT.classList.add("emptyTd");

  } else if (mobileStudentFind.AT === "D" || mobileStudentFind.AT === "DL" || mobileStudentFind.AT === "DML") {
    MobileAT.innerHTML = mobile
    MobileAT.classList.add("positiveNote");
  } else if (mobileStudentFind.AT === "ND") {
    MobileAT.innerHTML = mobileStudentFind.AT;
    MobileAT.classList.add("negativeNote");

  }

  if (mobileStudentFind.TP1 == null || mobileStudentFind.TP2 == null || mobileStudentFind.TP3 == null || mobileStudentFind.AT == null) {
    MobileSituation.innerHTML = "ongoing";
  } else if (mobileStudentFind.TP1 === "ND" || mobileStudentFind.TP2 === "ND" || mobileStudentFind.TP3 === "ND" || mobileStudentFind.AT === "ND") {
    MobileSituation.innerHTML = "failed";
    MobileSituation.classList.add("negativeNote");
  } else {
    MobileSituation.innerHTML = "approved";
    MobileSituation.classList.add("positiveNote");
  }

}else {
  mobileNotes.style.display = "none";
}
  
// ====================================== //

// FrontEnd Notes interation //

let frontEndStudentFind = dbFrontEndNotesSimulation.find(student => student.email === loggedUser.email);

if (frontEndStudentFind) {
  if (frontEndStudentFind.TP1 == null) {
    FrontEndTP1.innerHTML = "-";
    FrontEndTP1.classList.add("emptyTd");

  } else if (frontEndStudentFind.TP1 === "D" || frontEndStudentFind.TP1 === "DL" || frontEndStudentFind.TP1 === "DML") {
    FrontEndTP1.innerHTML = frontEndStudentFind.TP1;
    FrontEndTP1.classList.add("positiveNote");

  } else if (frontEndStudentFind.TP1 === "ND") {
    FrontEndTP1.innerHTML = frontEndStudentFind.TP1;
    FrontEndTP1.classList.add("negativeNote");

  }

  if (frontEndStudentFind.TP2 == null) {
    FrontEndTP2.innerHTML = "-";
    FrontEndTP2.classList.add("emptyTd");

  } else if (frontEndStudentFind.TP2 === "D" || frontEndStudentFind.TP2 === "DL" || frontEndStudentFind.TP2 === "DML") {
    FrontEndTP2.innerHTML = frontEndStudentFind.TP2;
    FrontEndTP2.classList.add("positiveNote");

  } else if (frontEndStudentFind.TP2 === "ND") {
    FrontEndTP2.innerHTML = frontEndStudentFind.TP2;
    FrontEndTP2.classList.add("negativeNote");

  }

  if (frontEndStudentFind.TP3 == null) {
    FrontEndTP3.innerHTML = "-";
    FrontEndTP3.classList.add("emptyTd");

  } else if (frontEndStudentFind.TP3 === "D" || frontEndStudentFind.TP3 === "DL" || frontEndStudentFind.TP3 === "DML") {
    FrontEndTP3.innerHTML = frontEndStudentFind.TP3;
    FrontEndTP3.classList.add("positiveNote");

  } else if (frontEndStudentFind.TP3 === "ND") {
    FrontEndTP3.innerHTML = frontEndStudentFind.TP3;
    FrontEndTP3.classList.add("negativeNote");

  }

  if (frontEndStudentFind.AT == null) {
    FrontEndAT.innerHTML = "-";
    FrontEndAT.classList.add("emptyTd");

  } else if (frontEndStudentFind.AT === "D" || frontEndStudentFind.AT === "DL" || frontEndStudentFind.AT === "DML") {
    FrontEndAT.innerHTML = frontEndStudentFind.AT;
    FrontEndAT.classList.add("positiveNote");

  } else if (frontEndStudentFind.AT === "ND") {
    FrontEndAT.innerHTML = frontEndStudentFind.AT;
    FrontEndAT.classList.add("negativeNote");

  }
  if (frontEndStudentFind.TP1 == null || frontEndStudentFind.TP2 == null || frontEndStudentFind.TP3 == null || frontEndStudentFind.AT == null) {
    FrontEndSituation.innerHTML = "ongoing";
  } else if (frontEndStudentFind.TP1 === "ND" || frontEndStudentFind.TP2 === "ND" || frontEndStudentFind.TP3 === "ND" || frontEndStudentFind.AT === "ND") {
    FrontEndSituation.innerHTML = "failed";
    FrontEndSituation.classList.add("negativeNote");
  } else {
    FrontEndSituation.innerHTML = "approved";
    FrontEndSituation.classList.add("positiveNote");
  }
}
else {
  frontEndNotes.style.display = "none";
}

// ====================================== //

// Programming Basis Notes interation //

let programmingBasisStudentFind = dbProgrammingBasisNotesSimulation.find(student => student.email === loggedUser.email);
if (programmingBasisStudentFind) {
  if (programmingBasisStudentFind.TP1 == null) {
    ProgrammingBasisTP1.innerHTML = "-";
    ProgrammingBasisTP1.classList.add("emptyTd");

  } else if (programmingBasisStudentFind.TP1 === "D" || programmingBasisStudentFind.TP1 === "DL" || programmingBasisStudentFind.TP1 === "DML") {
    ProgrammingBasisTP1.innerHTML = programmingBasisStudentFind.TP1;
    ProgrammingBasisTP1.classList.add("positiveNote");

  } else if (programmingBasisStudentFind.TP1 === "ND") {
    ProgrammingBasisTP1.innerHTML = programmingBasisStudentFind.TP1;
    ProgrammingBasisTP1.classList.add("negativeNote");

  }

  if (programmingBasisStudentFind.TP2 == null) {
    ProgrammingBasisTP2.innerHTML = "-";
    ProgrammingBasisTP2.classList.add("emptyTd");

  } else if (programmingBasisStudentFind.TP2 === "D" || programmingBasisStudentFind.TP2 === "DL" || programmingBasisStudentFind.TP2 === "DML") {
    ProgrammingBasisTP2.innerHTML = programmingBasisStudentFind.TP2;
    ProgrammingBasisTP2.classList.add("positiveNote");

  } else if (programmingBasisStudentFind.TP2 === "ND") {
    ProgrammingBasisTP2.innerHTML = programmingBasisStudentFind.TP2;
    ProgrammingBasisTP2.classList.add("negativeNote");

  }

  if (programmingBasisStudentFind.TP3 == null) {
    ProgrammingBasisTP3.innerHTML = "-";
    ProgrammingBasisTP3.classList.add("emptyTd");

  } else if (programmingBasisStudentFind.TP3 === "D" || programmingBasisStudentFind.TP3 === "DL" || programmingBasisStudentFind.TP3 === "DML") {
    ProgrammingBasisTP3.innerHTML = programmingBasisStudentFind.TP3;
    ProgrammingBasisTP3.classList.add("positiveNote");

  } else if (programmingBasisStudentFind.TP3 === "ND") {
    ProgrammingBasisTP3.innerHTML = programmingBasisStudentFind.TP3;
    ProgrammingBasisTP3.classList.add("negativeNote");

  }

  if (programmingBasisStudentFind.AT == null) {
    ProgrammingBasisAT.innerHTML = "-";
    ProgrammingBasisAT.classList.add("emptyTd");
  } else if (programmingBasisStudentFind.AT === "D" || programmingBasisStudentFind.AT === "DL" || programmingBasisStudentFind.AT === "DML") {
    ProgrammingBasisAT.innerHTML = programmingBasisStudentFind.AT;
    ProgrammingBasisAT.classList.add("positiveNote");

  } else if (programmingBasisStudentFind.AT === "ND") {
    ProgrammingBasisAT.innerHTML = programmingBasisStudentFind.AT;
    ProgrammingBasisAT.classList.add("negativeNote");

  }

  if (programmingBasisStudentFind.TP1 == null || programmingBasisStudentFind.TP2 == null || programmingBasisStudentFind.TP3 == null || programmingBasisStudentFind.AT == null) {
    ProgrammingBasisSituation.innerHTML = "ongoing";
  } else if (programmingBasisStudentFind.TP1 === "ND" || programmingBasisStudentFind.TP2 === "ND" || programmingBasisStudentFind.TP3 === "ND" || programmingBasisStudentFind.AT === "ND") {
    ProgrammingBasisSituation.innerHTML = "failed";
    ProgrammingBasisSituation.classList.add("negativeNote");
  } else {
    ProgrammingBasisSituation.innerHTML = "approved";
    ProgrammingBasisSituation.classList.add("positiveNote");
  }
}
else {
  programmingBasisNotes.style.display = "none";
}

// ====================================== //

// UI & UX Notes interation //

let uiAndUxStudentFind = dbUiAndUxNotesSimulation.find(student => student.email === loggedUser.email);

  if (uiAndUxStudentFind) {
    if (uiAndUxStudentFind.TP1 == null) {
      UiAndUxTP1.innerHTML = "-";
      UiAndUxTP1.classList.add("emptyTd");

    } else if (uiAndUxStudentFind.TP1 === "D" || uiAndUxStudentFind.TP1 === "DL" || uiAndUxStudentFind.TP1 === "DML") {
      UiAndUxTP1.innerHTML = uiAndUxStudentFind.TP1;
      UiAndUxTP1.classList.add("positiveNote");

    } else if (uiAndUxStudentFind.TP1 === "ND") {
      UiAndUxTP1.innerHTML = uiAndUxStudentFind.TP1;
      UiAndUxTP1.classList.add("negativeNote");

    }

    if (uiAndUxStudentFind.TP2 == null) {
      UiAndUxTP2.innerHTML = "-";
      UiAndUxTP2.classList.add("emptyTd");

    } else if (uiAndUxStudentFind.TP2 === "D" || uiAndUxStudentFind.TP2 === "DL" || uiAndUxStudentFind.TP2 === "DML") {
      UiAndUxTP2.innerHTML = uiAndUxStudentFind.TP2;
      UiAndUxTP2.classList.add("positiveNote");

    } else if (uiAndUxStudentFind.TP2 === "ND") {
      UiAndUxTP2.innerHTML = uiAndUxStudentFind.TP2;
      UiAndUxTP2.classList.add("negativeNote");

    }

    if (uiAndUxStudentFind.TP3 == null) {
      UiAndUxTP3.innerHTML = "-";
      UiAndUxTP3.classList.add("emptyTd");

    } else if (uiAndUxStudentFind.TP3 === "D" || uiAndUxStudentFind.TP3 === "DL" || uiAndUxStudentFind.TP3 === "DML") {
      UiAndUxTP3.innerHTML = uiAndUxStudentFind.TP3;
      UiAndUxTP3.classList.add("positiveNote");

    } else if (uiAndUxStudentFind.TP3 === "ND") {
      UiAndUxTP3.innerHTML = uiAndUxStudentFind.TP3;
      UiAndUxTP3.classList.add("negativeNote");

    }

    if (uiAndUxStudentFind.AT == null) {
      UiAndUxAT.innerHTML = "-";
      UiAndUxAT.classList.add("emptyTd");

    } else if (uiAndUxStudentFind.AT === "D" || uiAndUxStudentFind.AT === "DL" || uiAndUxStudentFind.AT === "DML") {
      UiAndUxAT.innerHTML = uiAndUxStudentFind.AT;
      UiAndUxAT.classList.add("positiveNote");

    } else if (uiAndUxStudentFind.AT === "ND") {
      UiAndUxAT.innerHTML = uiAndUxStudentFind.AT;
      UiAndUxAT.classList.add("negativeNote");

    }

    if (uiAndUxStudentFind.TP1 == null || uiAndUxStudentFind.TP2 == null || uiAndUxStudentFind.TP3 == null || uiAndUxStudentFind.AT == null) {
      UiAndUxSituation.innerHTML = "ongoing";
    } else if (uiAndUxStudentFind.TP1 === "ND" || uiAndUxStudentFind.TP2 === "ND" || uiAndUxStudentFind.TP3 === "ND" || uiAndUxStudentFind.AT === "ND") {
      UiAndUxSituation.innerHTML = "failed";
      UiAndUxSituation.classList.add("negativeNote");
    } else {
      UiAndUxSituation.innerHTML = "approved";
      UiAndUxSituation.classList.add("positiveNote");
    }
    
  } else {
    uiAndUxNotes.style.display = "none";
  }

// ====================================== //

// Data Science Notes Interation //

let dataScienceStudentFind = dbDataScienceNotesSimulation.find(student => student.email === loggedUser.email);

  if (dataScienceStudentFind) {
    if (dataScienceStudentFind.TP1 == null) {
      DataScienceTP1.innerHTML = "-";
      DataScienceTP1.classList.add("emptyTd");

    } else if (dataScienceStudentFind.TP1 === "D" || dataScienceStudentFind.TP1 === "DL" || dataScienceStudentFind.TP1 === "DML") {
      DataScienceTP1.innerHTML = dataScienceStudentFind.TP1;
      DataScienceTP1.classList.add("positiveNote");

    } else if (dataScienceStudentFind.TP1 === "ND") {
      DataScienceTP1.innerHTML = dataScienceStudentFind.TP1;
      DataScienceTP1.classList.add("negativeNote");

    }

    if (dataScienceStudentFind.TP2 == null) {
      DataScienceTP2.innerHTML = "-";
      DataScienceTP2.classList.add("emptyTd");

    } else if (dataScienceStudentFind.TP2 === "D" || dataScienceStudentFind.TP2 === "DL" || dataScienceStudentFind.TP2 === "DML") {
      DataScienceTP2.innerHTML = dataScienceStudentFind.TP2;
      DataScienceTP2.classList.add("positiveNote");

    } else if (dataScienceStudentFind.TP2 === "ND") {
      DataScienceTP2.innerHTML = dataScienceStudentFind.TP2;
      DataScienceTP2.classList.add("negativeNote");

    }

    if (dataScienceStudentFind.TP3 == null) {
      DataScienceTP3.innerHTML = "-";
      DataScienceTP3.classList.add("emptyTd");

    } else if (dataScienceStudentFind.TP3 === "D" || dataScienceStudentFind.TP3 === "DL" || dataScienceStudentFind.TP3 === "DML") {
      DataScienceTP3.innerHTML = dataScienceStudentFind.TP3;
      DataScienceTP3.classList.add("positiveNote");

    } else if (dataScienceStudentFind.TP3 === "ND") {
      DataScienceTP3.innerHTML = dataScienceStudentFind.TP3;
      DataScienceTP3.classList.add("negativeNote");

    }

    if (dataScienceStudentFind.AT == null) {
      DataScienceAT.innerHTML = "-";
      DataScienceAT.classList.add("emptyTd");

    } else if (dataScienceStudentFind.AT === "D" || dataScienceStudentFind.AT === "DL" || dataScienceStudentFind.AT === "DML") {
      DataScienceAT.innerHTML = dataScienceStudentFind.AT;
      DataScienceAT.classList.add("positiveNote");

    } else if (dataScienceStudentFind.AT === "ND") {
      DataScienceAT.innerHTML = dataScienceStudentFind.AT;
      DataScienceAT.classList.add("negativeNote");

    }

    if (dataScienceStudentFind.TP1 == null || dataScienceStudentFind.TP2 == null || dataScienceStudentFind.TP3 == null || dataScienceStudentFind.AT == null) {
      DataScienceSituation.innerHTML = "ongoing";
    } else if (dataScienceStudentFind.TP1 === "ND" || dataScienceStudentFind.TP2 === "ND" || dataScienceStudentFind.TP3 === "ND" || dataScienceStudentFind.AT === "ND") {
      DataScienceSituation.innerHTML = "failed";
      DataScienceSituation.classList.add("negativeNote");
    } else {
      DataScienceSituation.innerHTML = "approved";
      DataScienceSituation.classList.add("positiveNote");
    }
    
  } else {
    dataScienceNotes.style.display = "none";
  }

// ====================================== //

// ====================================== //

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