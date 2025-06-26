let frontEndCourse = document.querySelector(".frontEndCourse");
let backEndCourse = document.querySelector(".backEndCourse");
let mobileCourse = document.querySelector(".mobileCourse");
let dataScienceCourse = document.querySelector(".dataScienceCourse");
let UiAndUxCourse = document.querySelector(".uiAndUxCourse");
let programmingBasisCourse = document.querySelector(".programmingBasisCourse");
let cartfinalValue = document.querySelector(".cartfinalValue");
let userName = document.querySelector("#userName");
let cartTotalValue = document.querySelector(".cartTotalValue");
let cartTotalPurchase = document.querySelector(".cartTotalPurchase");

let sectionEmptyCart = document.querySelector(".sectionEmptyCart");
let table = document.querySelector("table");
let cartSummary = document.querySelector("#cartSummary");
let paymentSection = document.querySelector(".paymentSection");
let productsInCart = document.querySelector(".productsInCart");

function updateCart() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    userName.innerHTML = loggedUser.userName.split(" ")[0].trim();
    let frontEndisSelected = false;
    let backEndisSelected = false;
    let mobileisSelected = false;
    let dataScienceisSelected = false;
    let UiAndUxisSelected = false;
    let programmingBasisisSelected = false;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];  

    restoreOriginalDescriptions();

    cart.forEach((item) => {
        switch (item.ProductNameCart) {
            case "Front-End":
                frontEndisSelected = true;
                break;
            case "Back-End":
                backEndisSelected = true;
                break;
            case "Mobile":
                mobileisSelected = true;
                break;
            case "Data-Science":
                dataScienceisSelected = true;
                break;
            case "UI-UX-Desing":
                UiAndUxisSelected = true;
                break;
            case "Programming-Basis":
                programmingBasisisSelected = true;
                break;
        }
    });

    const cartCourses = [
        { condition: frontEndisSelected, course: frontEndCourse },
        { condition: backEndisSelected, course: backEndCourse },
        { condition: mobileisSelected, course: mobileCourse },
        { condition: dataScienceisSelected, course: dataScienceCourse },
        { condition: UiAndUxisSelected, course: UiAndUxCourse },
        { condition: programmingBasisisSelected, course: programmingBasisCourse }
    ];

    cartCourses.forEach(({ condition, course }) => {
        if (!condition){
            course.style.display = "none";
        } else {
            course.style.display = "table-row";
        }
    });

    const removeProductButtons = document.querySelectorAll(".cartTrash");
    removeProductButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const tr = event.target.closest("tr");
            const className = tr.getAttribute("class");
            let courseToDelete;

            switch (className) {
                case "frontEndCourse":
                    courseToDelete = "Front-End";
                    break;
                case "backEndCourse":
                    courseToDelete = "Back-End";
                    break;
                case "mobileCourse":
                    courseToDelete = "Mobile";
                    break;
                case "dataScienceCourse":
                    courseToDelete = "Data-Science";
                    break;
                case "uiAndUxCourse":
                    courseToDelete = "UI-UX-Desing";
                    break;
                case "programmingBasisCourse":
                    courseToDelete = "Programming-Basis";
                    break;
            }

            cart = cart.filter(item => item.ProductNameCart !== courseToDelete);
            localStorage.setItem("cart", JSON.stringify(cart));
            restoreOriginalDescriptions();
            updateCart();
        });
    });

    let totalValuePurchase = 0;

    cart.forEach((item) => {
        switch (item.ProductNameCart) {
            case "Front-End":
                totalValuePurchase += 219.99;
                break;
            case "Back-End":
                totalValuePurchase += 229.99;
                break;
            case "Mobile":
                totalValuePurchase += 219.99;
                break;
            case "Data-Science":
                totalValuePurchase += 229.99;
                break;
            case "UI-UX-Desing":
                totalValuePurchase += 174.99;
                break;
            case "Programming-Basis":
                totalValuePurchase += 199.99;
                break;
        }
    });

    cartTotalValue.innerHTML = `$${totalValuePurchase.toFixed(2)}`;
    cartTotalPurchase.innerHTML = `$${totalValuePurchase.toFixed(2)}`;
    
    if (cart.length == 0 || cart == null) {
        localStorage.removeItem("cart");
        table.setAttribute("style", "display: none");
        cartSummary.setAttribute("style", "display: none");
        sectionEmptyCart.setAttribute("style", "display: flex");
    } else {
        table.setAttribute("style", "display: table");
        cartSummary.setAttribute("style", "display: flex");
        sectionEmptyCart.setAttribute("style", "display: none");
        restoreOriginalDescriptions();
        verificarHistorico(cart, loggedUser);
    }
}

function verificarHistorico(cart, loggedUser) {
    console.log('[DEBUG] verificarHistorico chamada', cart, loggedUser);
    fetch(`http://localhost:8080/historico/buscar/${loggedUser.email}`)
        .then(response => response.json())
        .then(historicoData => {
            let historicos = [];
            if (historicoData.status !== "nao_encontrado") {
                historicos = historicoData;
            }
            const cursosAprovados = [];
            historicos.forEach(historico => {
                cart.forEach(item => {
                    if (historico.curso === item.ProductNameCart) {
                        if (historico.situacao === "Approved") {
                            cursosAprovados.push(item.ProductNameCart);
                        }
                    }
                });
            });
            verificarCursosEmAndamento(cart, loggedUser, cursosAprovados);
        })
        .catch(error => {
            console.error("Erro ao verificar histórico:", error);
        });
}


function verificarCursosEmAndamento(cart, loggedUser, cursosAprovados) {
    const descriptions = document.querySelectorAll(".pDescription");
    descriptions.forEach(desc => {
        desc.innerHTML = desc.innerHTML.replace(/<br><span style="color: #ff4444;">.*?<\/span>/g, "");
    });
    const endpoints = {
        "Back-End": "backend",
        "Front-End": "frontend", 
        "Mobile": "mobile",
        "Programming-Basis": "programming",
        "UI-UX-Desing": "uiux",
        "Data-Science": "datascience"
    };

    const promises = cart.map(item => {
        const endpoint = endpoints[item.ProductNameCart];
        
        if (endpoint) {
            return fetch(`http://localhost:8080/cursos/${endpoint}/alunos`)
                .then(response => response.json())
                .then(alunos => {
                    const alunoEncontrado = alunos.find(aluno => aluno.email === loggedUser.email);
                    return alunoEncontrado ? item.ProductNameCart : null;
                })
                .catch(error => {
                    return null;
                });
        }
        return null;
    });

    Promise.all(promises).then(resultados => {
        const cursosEmAndamento = resultados.filter(curso => curso !== null);
        const todosCursosBloqueados = [...cursosAprovados, ...cursosEmAndamento];

        if (todosCursosBloqueados.length > 0) {
            cursosAprovados.forEach(cursoAprovado => {
                const cursoElement = document.querySelector(`.${getClassByCourseName(cursoAprovado)} .pDescription`);
                if (cursoElement && !cursoElement.innerHTML.includes('Course already completed.')) {
                    cursoElement.innerHTML += '<br><span style="color: #ff4444;"><i class="fa-solid fa-circle-info"></i> Course already completed.</span>';
                }
            });

            cursosEmAndamento.forEach(cursoEmAndamento => {
                const cursoElement = document.querySelector(`.${getClassByCourseName(cursoEmAndamento)} .pDescription`);
                if (cursoElement && !cursoElement.innerHTML.includes('Course in progress.')) {
                    cursoElement.innerHTML += '<br><span style="color: #ff4444;"><i class="fa-solid fa-circle-info"></i> Course in progress.</span>';
                }
            });

            const buyButton = document.getElementById("buttonContinueToPayment");
            if (buyButton) {
                buyButton.disabled = true;
                buyButton.style.backgroundColor = "#cccccc";
                buyButton.style.cursor = "not-allowed";
                buyButton.style.border = "none";
                buyButton.style.pointerEvents = "none";
                if (cursosAprovados.length > 0 && cursosEmAndamento.length > 0) {
                    buyButton.value = "Remove blocked courses";
                } else if (cursosAprovados.length > 0) {
                    buyButton.value = "Remove completed courses";
                } else if (cursosEmAndamento.length > 0) {
                    buyButton.value = "Remove ongoing courses";
                }
            }
        } else {
            const buyButton = document.getElementById("buttonContinueToPayment");
            if (buyButton) {
                buyButton.disabled = false;
                buyButton.style.backgroundColor = "";
                buyButton.style.cursor = "pointer";
                buyButton.style.pointerEvents = "";
                buyButton.value = "Continue";
                buyButton.style.border = "1px solid #7B1CE0";
            }
        }
    });
}

function getClassByCourseName(courseName) {
    switch (courseName) {
        case "Front-End":
            return "frontEndCourse";
        case "Back-End":
            return "backEndCourse";
        case "Mobile":
            return "mobileCourse";
        case "Data-Science":
            return "dataScienceCourse";
        case "UI-UX-Desing":
            return "uiAndUxCourse";
        case "Programming-Basis":
            return "programmingBasisCourse";
        default:
            return "";
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("cart");
    window.location.href = "http://localhost:3000";
  }

function Buy() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
        alert("Você precisa estar logado para fazer a compra!");
        window.location.href = "http://localhost:3000/Login/login.html";
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    table.style.display = "none";
    cartSummary.style.display = "none";
    paymentSection.style.display = "flex";

    populatePaymentProducts(cart);

    updateHeaderForPayment();
}

function populatePaymentProducts(cart) {
    const courseImages = {
        "Back-End": "CartPictures/skill-icons--python-dark.png",
        "Front-End": "CartPictures/skill-icons--react-dark.png",
        "Mobile": "CartPictures/skill-icons--swift.png",
        "Data-Science": "CartPictures/skill-icons--mysql-light.png",
        "UI-UX-Desing": "CartPictures/skill-icons--figma-dark.png",
        "Programming-Basis": "CartPictures/skill-icons--vscode-dark.png"
    };

    const coursePrices = {
        "Back-End": "$229.99",
        "Front-End": "$219.99",
        "Mobile": "$219.99",
        "Data-Science": "$229.99",
        "UI-UX-Desing": "$174.99",
        "Programming-Basis": "$199.99"
    };

    productsInCart.innerHTML = "";

    cart.forEach(item => {
        const courseDiv = document.createElement("div");
        courseDiv.className = "divCoursePayment";
        
        courseDiv.innerHTML = `
            <div class="divCourseNameAndPng">
                <img src="${courseImages[item.ProductNameCart]}" alt="">
                <p class="courseNamePayment">${item.ProductNameCart}</p>
            </div>
            <div class="divCoursePricePayment">
                <p class="coursePricePayment">${coursePrices[item.ProductNameCart]}</p> 
            </div>
        `;
        
        productsInCart.appendChild(courseDiv);
    });

    let totalValue = 0;
    cart.forEach(item => {
        switch (item.ProductNameCart) {
            case "Front-End":
                totalValue += 219.99;
                break;
            case "Back-End":
                totalValue += 229.99;
                break;
            case "Mobile":
                totalValue += 219.99;
                break;
            case "Data-Science":
                totalValue += 229.99;
                break;
            case "UI-UX-Desing":
                totalValue += 174.99;
                break;
            case "Programming-Basis":
                totalValue += 199.99;
                break;
        }
    });

    const paymentTotalValues = document.querySelectorAll(".paymentSection .cartTotalValue");
    const paymentTotalPurchases = document.querySelectorAll(".paymentSection .cartTotalPurchase");
    
    paymentTotalValues.forEach(element => {
        element.innerHTML = `$${totalValue.toFixed(2)}`;
    });
    
    paymentTotalPurchases.forEach(element => {
        element.innerHTML = `$${totalValue.toFixed(2)}`;
    });
}

function updateHeaderForPayment() {
    const cartStyle = document.querySelector(".cartStyle");
    const paymentStyle = document.querySelector(".paymentStyle");
    
    if (cartStyle && paymentStyle) {
        cartStyle.style.backgroundColor = "#7e7e7e9f";
        paymentStyle.style.backgroundColor = "#cacaca";
        
        const divNumber1 = cartStyle.querySelector(".divNumber1");
        const divPayment2 = paymentStyle.querySelector(".divPayment2");
        
        if (divNumber1) divNumber1.style.backgroundColor = "rgba(0, 0, 0, 0.377)";
        if (divPayment2) divPayment2.style.backgroundColor = "#000000";
        
        const classNumber1 = cartStyle.querySelector(".classNumber1");
        const classPayment2 = paymentStyle.querySelector(".classPayment2");
        
        if (classNumber1) classNumber1.style.color = "#a1a1a1";
        if (classPayment2) classPayment2.style.color = "#cacaca";
        
        const cartStyleContent = cartStyle.querySelector(".cartStyleContent");
        const paymentStyleContent = paymentStyle.querySelector(".paymentStyleContent");
        
        if (cartStyleContent) cartStyleContent.style.color = "rgba(0, 0, 0, 0.37)";
        if (paymentStyleContent) paymentStyleContent.style.color = "#000000";
    }
}

function returnToCart() {
    table.style.display = "table";
    cartSummary.style.display = "flex";
    paymentSection.style.display = "none";

    restoreHeaderForCart();
    
    updateCart();
}

function restoreHeaderForCart() {
    const cartStyle = document.querySelector(".cartStyle");
    const paymentStyle = document.querySelector(".paymentStyle");
    
    if (cartStyle && paymentStyle) {
        cart
        paymentStyle.style.backgroundColor = "#7e7e7e9f";
        
        const divNumber1 = cartStyle.querySelector(".divNumber1");
        const divPayment2 = paymentStyle.querySelector(".divPayment2");
        
        if (divNumber1) divNumber1.style.backgroundColor = "#000000";
        if (divPayment2) divPayment2.style.backgroundColor = "rgba(0, 0, 0, 0.377)";
        
        const classNumber1 = cartStyle.querySelector(".classNumber1");
        const classPayment2 = paymentStyle.querySelector(".classPayment2");
        
        if (classNumber1) classNumber1.style.color = "#cacaca";
        if (classPayment2) classPayment2.style.color = "#a1a1a1";
        
        const cartStyleContent = cartStyle.querySelector(".cartStyleContent");
        const paymentStyleContent = paymentStyle.querySelector(".paymentStyleContent");
        
        if (cartStyleContent) cartStyleContent.style.color = "#000000";
        if (paymentStyleContent) paymentStyleContent.style.color = "rgba(0, 0, 0, 0.37)";
    }
}

function restoreOriginalDescriptions() {
    const originalDescriptions = {
        "frontEndCourse": "Languages: React, React Native, HTML, CSS, JavaScript...",
        "backEndCourse": "Languages: Java, Python, C#, PHP, NodeJs...",
        "mobileCourse": "Languages: Flutter, Kotlin, Swift, Android, IOS...",
        "dataScienceCourse": "Languages: Machine Learning, SQL, noSQL, Excel, BI, Database...",
        "uiAndUxCourse": "Languages: UI and UX concepts, 3D, Video, Motion...",
        "programmingBasisCourse": "Languages: Learn the basic fundamentals of programming..."
    };

    Object.keys(originalDescriptions).forEach(className => {
        const cursoElement = document.querySelector(`.${className} .pDescription`);
        if (cursoElement) {
            cursoElement.innerHTML = originalDescriptions[className];
        }
    });
}

function confirmPayment() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
        alert("Você precisa estar logado para fazer a compra!");
        window.location.href = "http://localhost:3000/Login/login.html";
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const userData = {
        nomeCompleto: loggedUser.userName,
        emailEducacional: loggedUser.email,
        tp1: null,
        tp2: null,
        tp3: null, 
        assesment: null
    };

    const promises = cart.map(item => {
        const endpoint = item.ProductNameCart;
        if (endpoint) {
            return fetch(`http://localhost:8080/cursos/${endpoint}/adicionar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "sucesso") {
                    console.log(`Aluno adicionado com sucesso ao curso ${item.ProductNameCart}`);
                    return { success: true, course: item.ProductNameCart };
                } else {
                    console.error(`Erro ao adicionar aluno ao curso ${item.ProductNameCart}:`, data.mensagem);
                    return { success: false, course: item.ProductNameCart, error: data.mensagem };
                }
            })
            .catch(error => {
                console.error(`Erro na requisição para o curso ${item.ProductNameCart}:`, error);
                return { success: false, course: item.ProductNameCart, error: error.message };
            });
        }
        return Promise.resolve({ success: false, course: item.ProductNameCart, error: "Endpoint não encontrado" });
    });

    Promise.all(promises).then(results => {
        const successful = results.filter(result => result.success);
        const failed = results.filter(result => !result.success);

        if (successful.length > 0) {
            const successfulCourses = successful.map(result => result.course);
            const updatedCart = cart.filter(item => !successfulCourses.includes(item.ProductNameCart));
            
            if (updatedCart.length === 0) {
                localStorage.removeItem("cart");
            } else {
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }

            if (failed.length === 0) {
                alert("Compra realizada com sucesso! Você foi inscrito nos cursos selecionados.");
                window.location.reload();
            } else {
                alert(`Compra parcialmente realizada! ${successful.length} curso(s) inscrito(s) com sucesso. ${failed.length} curso(s) com erro.`);
                returnToCart();
                updateCart();
            }
        } else {
            alert("Erro ao processar a compra. Tente novamente.");
        }
    });
}

updateCart()