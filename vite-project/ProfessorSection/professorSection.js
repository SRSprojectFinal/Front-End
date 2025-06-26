window.onload = () => {
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    let professors = JSON.parse(localStorage.getItem("userList") || "[]");
  
    let animationTriggered = false;
  
    const upperCardMinistering = document.querySelector(".cardMinistering");
  
    const cardFrontEnd = document.querySelector(".cardFrontEnd");
    const frontProgressBar = document.querySelector(".frontProgressBar");
    const frontValue = document.querySelector(".frontValue");
    const frontCompletedText = document.querySelector(".frontCompletedText");
  
    const cardBackEnd = document.querySelector(".cardBackEnd");
    const backProgressBar = document.querySelector(".backProgressBar");
    const backValue = document.querySelector(".backValue");
    const backCompletedText = document.querySelector(".backCompletedText");
  
    const cardMobile = document.querySelector(".cardMobile");
    const mobileProgressBar = document.querySelector(".mobileProgressBar");
    const mobileValue = document.querySelector(".mobileValue");
    const mobileCompletedText = document.querySelector(".mobileCompletedText");
  
    const cardDataScience = document.querySelector(".cardDataScience");
    const dataScienceProgressBar = document.querySelector(".dataScienceProgressBar");
    const dataScienceValue = document.querySelector(".dataScienceValue");
    const dataScienceCompletedText = document.querySelector(".dataScienceCompletedText");
  
    const cardUIandUX = document.querySelector(".cardUiandUx");
    const uiandUxProgressBar = document.querySelector(".uiandUxProgressBar");
    const uiandUxValue = document.querySelector(".uiandUxValue");
    const uiandUxCompletedText = document.querySelector(".uiandUxCompletedText");
  
    const cardProgrammingBasis = document.querySelector(".cardProgrammingBasis");
    const programmingBasisProgressBar = document.querySelector(".programmingBasisProgressBar");
    const programmingBasisValue = document.querySelector(".programmingBasisValue");
    const programmingBasisCompletedText = document.querySelector(".programmingBasisCompletedText");
  
    let loggedName = loggedUser.userName;
    const firstNameLoggedUser = loggedName.split(" ")[0];
  
    let cardProfessorName = document.querySelector(".cardProfessorName");
    let account = document.querySelector(".account");
  
    account.innerHTML = `Hello ${firstNameLoggedUser} <i class="fa-solid fa-user"></i>`;
    cardProfessorName.innerHTML = firstNameLoggedUser;

  
    function animateProgress(value, progressBar, completedText, finalValue) {
      let initialProgress = 0;
      let finalProgress = finalValue;
  
      let progress = setInterval(() => {
        value.textContent = `${initialProgress}%`;
        progressBar.style.background = `conic-gradient(#7B1CE0 ${initialProgress * 3.6}deg, #d8d8d8 0deg)`;
  
        if (initialProgress === finalProgress) clearInterval(progress);
  
        if (initialProgress === 0) {
          value.style.color = "#d8d8d8";
          progressBar.style.color = "#d8d8d8";
          completedText.style.color = "#d8d8d8";
        }
  
        if (initialProgress > 0 && initialProgress < 100) {
          value.style.color = "#7B1CE0";
          progressBar.style.color = "#7B1CE0";
          completedText.style.color = "#7B1CE0";
        }
  
        if (initialProgress === 100) {
          value.style.color = "#2FAE28";
          progressBar.style.background = `conic-gradient(#2FAE28 360deg, #d8d8d8 0deg)`;
          completedText.style.color = "#2FAE28";
        }
  
        initialProgress++;
      }, 30);
    }
  
    function timerAnimations() {
      const h1ProfessorHeader = document.querySelector(".h1ProfessorHeader");
      const h1SectionHeader = document.querySelector(".h1SectionHeader");
      const hashTag = document.querySelector(".hashTag");
      const htmlReference = document.querySelector(".htmlReference");
      const cardProfessor = document.querySelector(".cardProfessor");
      const cardMinistering = document.querySelector(".cardMinistering");
  
      setTimeout(() => {
        h1ProfessorHeader.classList.remove("typingEffect2");
        h1SectionHeader.classList.remove("invisible");
        h1SectionHeader.classList.add("typingEffect");
      }, 2000);
  
      setTimeout(() => {
        hashTag.classList.remove("invisible");
        hashTag.classList.add("slideToRight");
  
        htmlReference.classList.remove("invisible");
        htmlReference.classList.add("slideToLeft");
  
        cardProfessor.classList.remove("invisible");
        cardProfessor.classList.add("slideToBottom1");
  
        cardMinistering.classList.remove("invisible");
        cardMinistering.classList.add("slideToBottom2");
      }, 4500);
  
      setTimeout(() => {
        h1SectionHeader.classList.remove("typingEffect");
      }, 9000);
    }
  
    timerAnimations();
  
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const sectionPosition = document.querySelector("#ProfessorSection").offsetTop + 500;
  
      if (scrollPosition >= sectionPosition && !animationTriggered) {
        animationTriggered = true;
  
        const porcentagens = window.porcentagensCursos || {};
        
        animateProgress(frontValue, frontProgressBar, frontCompletedText, porcentagens['Front-End'] || 0);
        animateProgress(backValue, backProgressBar, backCompletedText, porcentagens['Back-End'] || 0);
        animateProgress(mobileValue, mobileProgressBar, mobileCompletedText, porcentagens['Mobile'] || 0);
        animateProgress(dataScienceValue, dataScienceProgressBar, dataScienceCompletedText, porcentagens['Data-Science'] || 0);
        animateProgress(uiandUxValue, uiandUxProgressBar, uiandUxCompletedText, porcentagens['UI-UX'] || 0);
        animateProgress(programmingBasisValue, programmingBasisProgressBar, programmingBasisCompletedText, porcentagens['Programming-Basis'] || 0);
      }
    });
  
    function calcularPorcentagemNotas(curso) {
      const endpoints = {
        'Front-End': 'http://localhost:8080/cursos/frontend/alunos',
        'Back-End': 'http://localhost:8080/cursos/backend/alunos',
        'Mobile': 'http://localhost:8080/cursos/mobile/alunos',
        'Data-Science': 'http://localhost:8080/cursos/datascience/alunos',
        'UI-UX-Design': 'http://localhost:8080/cursos/uiux/alunos',
        'Programming-Basis': 'http://localhost:8080/cursos/programming/alunos'
      };

      const endpoint = endpoints[curso];
      if (!endpoint) return Promise.resolve(0);

      return fetch(endpoint)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(alunos => {
          if (!alunos || alunos.length === 0) return 0;

          let notasPreenchidas = 0;
          let totalNotas = 0;

          alunos.forEach(aluno => {
            const camposNota = ['tp1', 'tp2', 'tp3', 'assesment'];
            
            camposNota.forEach(campo => {
              if (aluno[campo] !== undefined && aluno[campo] !== null && aluno[campo] !== '') {
                notasPreenchidas++;
              }
              totalNotas++;
            });
          });

          const porcentagem = totalNotas > 0 ? Math.round((notasPreenchidas / totalNotas) * 100) : 0;
          return Math.min(porcentagem, 100);
        })
        .catch(error => {
          return 0;
        });
    }

    function buscarCursosDoProfessor() {
      const mapeamentoCursos = {
        'Front-End': { card: cardFrontEnd, name: 'Front End' },
        'Back-End': { card: cardBackEnd, name: 'Back End' },
        'Mobile': { card: cardMobile, name: 'Mobile' },
        'Data-Science': { card: cardDataScience, name: 'Data Science' },
        'UI_UX': { card: cardUIandUX, name: 'UI & UX' },
        'Programming-Basis': { card: cardProgrammingBasis, name: 'Programming Basis' }
      };

      fetch('http://localhost:8080/grade')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const grade = data.grade;
            const cursosDoProfessor = grade.filter(item => 
              item.emailEducacional === loggedUser.email
            );
            
            Object.values(mapeamentoCursos).forEach(({ card }) => {
              card.style.display = "none";
            });
            
            upperCardMinistering.innerHTML = '<h3>Ministering</h3>';
            
            cursosDoProfessor.forEach(item => {
              const cursoInfo = mapeamentoCursos[item.curso];
              if (cursoInfo) {
                cursoInfo.card.style.display = "flex";
                upperCardMinistering.innerHTML += `<p>${cursoInfo.name}</p>`;
              }
            });
            
            atualizarAmounts();
            
            Promise.all(
              cursosDoProfessor.map(item => 
                calcularPorcentagemNotas(item.curso).then(porcentagem => ({
                  curso: item.curso,
                  porcentagem: porcentagem
                }))
              )
            ).then(resultados => {
              window.porcentagensCursos = {};
              resultados.forEach(resultado => {
                window.porcentagensCursos[resultado.curso] = resultado.porcentagem;
              });
            }).catch(error => {
              console.error('Erro ao calcular porcentagens:', error);
              window.porcentagensCursos = {};
            });
          }
        })
        .catch(error => {
          console.error('Erro ao buscar cursos do professor:', error);
          Object.values(mapeamentoCursos).forEach(({ card }) => {
            card.style.display = "block";
          });
        });
    }
  
    buscarCursosDoProfessor();
  
    function atualizarAmounts() {
      fetch('http://localhost:8080/cursos/frontend/contar')
        .then(res => res.json())
        .then(data => document.getElementById('amountFrontEnd').textContent = data.quantidade)
        .catch(() => document.getElementById('amountFrontEnd').textContent = '-');

      fetch('http://localhost:8080/cursos/backend/contar')
        .then(res => res.json())
        .then(data => document.getElementById('amountBackEnd').textContent = data.quantidade)
        .catch(() => document.getElementById('amountBackEnd').textContent = '-');

      fetch('http://localhost:8080/cursos/mobile/contar')
        .then(res => res.json())
        .then(data => document.getElementById('amountMobile').textContent = data.quantidade)
        .catch(() => document.getElementById('amountMobile').textContent = '-');

      fetch('http://localhost:8080/cursos/datascience/contar')
        .then(res => res.json())
        .then(data => document.getElementById('amountDataScience').textContent = data.quantidade)
        .catch(() => document.getElementById('amountDataScience').textContent = '-');

      fetch('http://localhost:8080/cursos/uiux/contar')
        .then(res => res.json())
        .then(data => document.getElementById('amountUiUx').textContent = data.quantidade)
        .catch(() => document.getElementById('amountUiUx').textContent = '-');

      fetch('http://localhost:8080/cursos/programming/contar')
        .then(res => res.json())
        .then(data => document.getElementById('amountProgrammingBasis').textContent = data.quantidade)
        .catch(() => document.getElementById('amountProgrammingBasis').textContent = '-');
    }
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("cart");
    window.location.href = "http://localhost:3000";
  }
  
  function goToFrontEndTable() {
    window.location.href = "http://localhost:3000/ProfessorSection/FrontEndTable/frontEndTable.html";
  }

  function goToBackEndTable() {
    window.location.href = "http://localhost:3000/ProfessorSection/BackEndTable/backEndTable.html";
  }

  function goToMobileTable() {
    window.location.href = "http://localhost:3000/ProfessorSection/MobileTable/mobileTable.html";
  }

  function goToDataScienceTable() {
    window.location.href = "http://localhost:3000/ProfessorSection/DataScienceTable/dataScienceTable.html";
  }

  function goToProgrammingBasisTable() {
    window.location.href = "http://localhost:3000/ProfessorSection/ProgrammingBasisTable/programmingBasisTable.html";
  }

  function goToUiAndUxTable() {
    window.location.href = "http://localhost:3000/ProfessorSection/UiAndUxTable/uiAndUxTable.html";
  }
  