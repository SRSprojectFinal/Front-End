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


async function fetchCourseData(courseEndpoint) {
  try {
    const response = await fetch(`http://localhost:8080/cursos/${courseEndpoint}/alunos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar dados do curso ${courseEndpoint}:`, error);
    return [];
  }
}

function processCourseNotes(studentData, tp1Element, tp2Element, tp3Element, atElement, situationElement, notesContainer) {
  if (studentData) {
    if (studentData.tp1 == null) {
      tp1Element.innerHTML = "-";
      tp1Element.classList.add("emptyTd");
    } else if (studentData.tp1 === "D" || studentData.tp1 === "DL" || studentData.tp1 === "DML") {
      tp1Element.innerHTML = studentData.tp1;
      tp1Element.classList.add("positiveNote");
    } else if (studentData.tp1 === "ND") {
      tp1Element.innerHTML = studentData.tp1;
      tp1Element.classList.add("negativeNote");
    }


    if (studentData.tp2 == null) {
      tp2Element.innerHTML = "-";
      tp2Element.classList.add("emptyTd");
    } else if (studentData.tp2 === "D" || studentData.tp2 === "DL" || studentData.tp2 === "DML") {
      tp2Element.innerHTML = studentData.tp2;
      tp2Element.classList.add("positiveNote");
    } else if (studentData.tp2 === "ND") {
      tp2Element.innerHTML = studentData.tp2;
      tp2Element.classList.add("negativeNote");
    }


    if (studentData.tp3 == null) {
      tp3Element.innerHTML = "-";
      tp3Element.classList.add("emptyTd");
    } else if (studentData.tp3 === "D" || studentData.tp3 === "DL" || studentData.tp3 === "DML") {
      tp3Element.innerHTML = studentData.tp3;
      tp3Element.classList.add("positiveNote");
    } else if (studentData.tp3 === "ND") {
      tp3Element.innerHTML = studentData.tp3;
      tp3Element.classList.add("negativeNote");
    }


    if (studentData.assesment == null) {
      atElement.innerHTML = "-";
      atElement.classList.add("emptyTd");
    } else if (studentData.assesment === "D" || studentData.assesment === "DL" || studentData.assesment === "DML") {
      atElement.innerHTML = studentData.assesment;
      atElement.classList.add("positiveNote");
    } else if (studentData.assesment === "ND") {
      atElement.innerHTML = studentData.assesment;
      atElement.classList.add("negativeNote");
    }


    if (studentData.tp1 == null || studentData.tp2 == null || studentData.tp3 == null || studentData.assesment == null) {
      situationElement.innerHTML = "ongoing";
    } else if (studentData.tp1 === "ND" || studentData.tp2 === "ND" || studentData.tp3 === "ND" || studentData.assesment === "ND") {
      situationElement.innerHTML = "failed";
      situationElement.classList.add("negativeNote");
    } else {
      situationElement.innerHTML = "approved";
      situationElement.classList.add("positiveNote");
    }
  } else {
    notesContainer.style.display = "none";
  }
}

async function loadAllNotes() {
  const backEndData = await fetchCourseData("backend");
  console.log(backEndData);
  const backEndStudent = backEndData.find(student => student.email === loggedUser.email);
  processCourseNotes(backEndStudent, BackEndTP1, BackEndTP2, BackEndTP3, BackEndAT, BackEndSituation, backEndNotes);

  const frontEndData = await fetchCourseData("frontend");
  console.log(frontEndData);
  const frontEndStudent = frontEndData.find(student => student.email === loggedUser.email);
  processCourseNotes(frontEndStudent, FrontEndTP1, FrontEndTP2, FrontEndTP3, FrontEndAT, FrontEndSituation, frontEndNotes);


  const mobileData = await fetchCourseData("mobile");
  console.log(mobileData);
  const mobileStudent = mobileData.find(student => student.email === loggedUser.email);
  processCourseNotes(mobileStudent, MobileTP1, MobileTP2, MobileTP3, MobileAT, MobileSituation, mobileNotes);


  const programmingData = await fetchCourseData("programming");
  console.log(programmingData);
  const programmingStudent = programmingData.find(student => student.email === loggedUser.email);
  processCourseNotes(programmingStudent, ProgrammingBasisTP1, ProgrammingBasisTP2, ProgrammingBasisTP3, ProgrammingBasisAT, ProgrammingBasisSituation, programmingBasisNotes);


  const uiUxData = await fetchCourseData("uiux");
  console.log(uiUxData);
  const uiUxStudent = uiUxData.find(student => student.email === loggedUser.email);
  processCourseNotes(uiUxStudent, UiAndUxTP1, UiAndUxTP2, UiAndUxTP3, UiAndUxAT, UiAndUxSituation, uiAndUxNotes);


  const dataScienceData = await fetchCourseData("datascience");
  console.log(dataScienceData);
  const dataScienceStudent = dataScienceData.find(student => student.email === loggedUser.email);
  processCourseNotes(dataScienceStudent, DataScienceTP1, DataScienceTP2, DataScienceTP3, DataScienceAT, DataScienceSituation, dataScienceNotes);
}


async function fetchGradeData() {
  try {
    const response = await fetch('http://localhost:8080/grade');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.success ? data.grade : [];
  } catch (error) {
    console.error('Erro ao buscar dados da grade:', error);
    return [];
  }
}


async function fetchUsersData() {
  try {
    const response = await fetch('http://localhost:8080/usuarios');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.success ? data.usuarios : [];
  } catch (error) {
    console.error('Erro ao buscar dados de usuários:', error);
    return [];
  }
}


async function getProfessorEmail(courseName) {
  try {
    const gradeData = await fetchGradeData();
    const usersData = await fetchUsersData();
    
    const courseMapping = {
      'backend': 'Back-End',
      'frontend': 'Front-End', 
      'mobile': 'Mobile',
      'datascience': 'Data-Science',
      'uiux': 'UI_UX',
      'programming': 'Programming-Basis'
    };
    
    const courseDisplayName = courseMapping[courseName];
    if (!courseDisplayName) {
      console.error(`Curso ${courseName} não encontrado no mapeamento`);
      return null;
    }
    

    const course = gradeData.find(c => c.curso.toLowerCase() === courseDisplayName.toLowerCase());
    if (!course) {
      console.error(`Curso ${courseDisplayName} não encontrado na grade`);
      return null;
    }
    

    let professor = usersData.find(u => u.emailEducacional === course.emailEducacional);
    
    if (!professor) {
      professor = usersData.find(u => u.userName === course.professor);
    }
    
    if (!professor) {
      console.error(`Professor do curso ${courseDisplayName} não encontrado`);
      console.error('Nome do professor:', course.professor);
      console.error('Email educacional:', course.emailEducacional);
      console.error('Usuários disponíveis:', usersData.map(u => ({ nome: u.userName, email: u.email })));
      return null;
    }
    
    return professor.email;
  } catch (error) {
    console.error('Erro ao buscar email do professor:', error);
    return null;
  }
}


function openGmailContest(courseName, noteType, noteValue, professorEmail) {
  const courseMapping = {
    'backend': 'Back-End',
    'frontend': 'Front-End', 
    'mobile': 'Mobile',
    'datascience': 'Data Science',
    'uiux': 'UI & UX',
    'programming': 'Programming Basis'
  };
  
  const courseDisplayName = courseMapping[courseName] || courseName;
  const subject = `Grade Contest - ${noteType} - ${courseDisplayName}`;
  const body = ``;
  
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(professorEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  try {
    window.open(gmailUrl, '_blank');
  } catch (error) {
    navigator.clipboard.writeText(gmailUrl).then(() => {
      alert('Link do email copiado para clipboard. Cole no seu cliente de email.');
    });
  }
}


async function handleContestClick(event) {
  const buttonId = event.target.id;
  const [courseName, noteType] = buttonId.split('-');
  

  const professorEmail = await getProfessorEmail(courseName);
  if (!professorEmail) {
    alert('Erro ao obter email do professor. Tente novamente.');
    return;
  }
  

  let noteValue = '';
  let noteElement = null;
  
  switch (noteType) {
    case 'tp1':
      if (courseName === 'backend') noteElement = document.querySelector('.BackEndTP1');
      else if (courseName === 'frontend') noteElement = document.querySelector('.FrontEndTP1');
      else if (courseName === 'mobile') noteElement = document.querySelector('.MobileTP1');
      else if (courseName === 'datascience') noteElement = document.querySelector('.DataScienceTP1');
      else if (courseName === 'uiux') noteElement = document.querySelector('.UiAndUxTP1');
      else if (courseName === 'programming') noteElement = document.querySelector('.ProgrammingBasisTP1');
      break;
    case 'tp2':
      if (courseName === 'backend') noteElement = document.querySelector('.BackEndTP2');
      else if (courseName === 'frontend') noteElement = document.querySelector('.FrontEndTP2');
      else if (courseName === 'mobile') noteElement = document.querySelector('.MobileTP2');
      else if (courseName === 'datascience') noteElement = document.querySelector('.DataScienceTP2');
      else if (courseName === 'uiux') noteElement = document.querySelector('.UiAndUxTP2');
      else if (courseName === 'programming') noteElement = document.querySelector('.ProgrammingBasisTP2');
      break;
    case 'tp3':
      if (courseName === 'backend') noteElement = document.querySelector('.BackEndTP3');
      else if (courseName === 'frontend') noteElement = document.querySelector('.FrontEndTP3');
      else if (courseName === 'mobile') noteElement = document.querySelector('.MobileTP3');
      else if (courseName === 'datascience') noteElement = document.querySelector('.DataScienceTP3');
      else if (courseName === 'uiux') noteElement = document.querySelector('.UiAndUxTP3');
      else if (courseName === 'programming') noteElement = document.querySelector('.ProgrammingBasisTP3');
      break;
    case 'at':
      if (courseName === 'backend') noteElement = document.querySelector('.BackEndAT');
      else if (courseName === 'frontend') noteElement = document.querySelector('.FrontEndAT');
      else if (courseName === 'mobile') noteElement = document.querySelector('.MobileAT');
      else if (courseName === 'datascience') noteElement = document.querySelector('.DataScienceAT');
      else if (courseName === 'uiux') noteElement = document.querySelector('.UiAndUxAT');
      else if (courseName === 'programming') noteElement = document.querySelector('.ProgrammingBasisAT');
      break;
    case 'situation':
      if (courseName === 'backend') noteElement = document.querySelector('.BackEndSituation');
      else if (courseName === 'frontend') noteElement = document.querySelector('.FrontEndSituation');
      else if (courseName === 'mobile') noteElement = document.querySelector('.MobileSituation');
      else if (courseName === 'datascience') noteElement = document.querySelector('.DataScienceSituation');
      else if (courseName === 'uiux') noteElement = document.querySelector('.UiAndUxSituation');
      else if (courseName === 'programming') noteElement = document.querySelector('.ProgrammingBasisSituation');
      break;
  }
  
  if (noteElement) {
    noteValue = noteElement.textContent || '-';
  }
  

  openGmailContest(courseName, noteType.toUpperCase(), noteValue, professorEmail);
}


function addContestButtonListeners() {
  const contestButtons = document.querySelectorAll('.contestbutton');
  contestButtons.forEach(button => {
    button.addEventListener('click', handleContestClick);
  });
}


loadAllNotes();


addContestButtonListeners();



let loggedName = loggedUser.userName;
const firstNameLoggedUser = loggedName.split(" ")[0].trim();

let account = document.querySelector(".account");
account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "http://localhost:3000";
}