let frontEndCourse = document.querySelector(".frontEndCourse");
let backEndCourse = document.querySelector(".backEndCourse");
let mobileCourse = document.querySelector(".mobileCourse");
let dataScienceCourse = document.querySelector(".dataScienceCourse");
let UiAndUxCourse = document.querySelector(".uiAndUxCourse");
let programmingBasisCourse = document.querySelector(".programmingBasisCourse");
let cartfinalValue = document.querySelector(".cartfinalValue");

let cartTotalValue = document.querySelector(".cartTotalValue");
let cartTotalPurchase = document.querySelector(".cartTotalPurchase");

let sectionEmptyCart = document.querySelector(".sectionEmptyCart");
let table = document.querySelector("table");
let cartSummary = document.querySelector("#cartSummary");

function updateCart() {

    let frontEndisSelected = false;
    let backEndisSelected = false;
    let mobileisSelected = false;
    let dataScienceisSelected = false;
    let UiAndUxisSelected = false;
    let programmingBasisisSelected = false;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
                case "Data Science":
                    dataScienceisSelected = true;
                    break;
                case "UI & UX Desing":
                    UiAndUxisSelected = true;
                    break;
                case "Programming Basis":
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
                        courseToDelete = "Data Science";
                        break;
                    case "uiAndUxCourse":
                        courseToDelete = "UI & UX Desing";
                        break;
                    case "programmingBasisCourse":
                        courseToDelete = "Programming Basis";
                        break;
                }
                

                cart = cart.filter(item => item.ProductNameCart !== courseToDelete);
                localStorage.setItem("cart", JSON.stringify(cart));

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
                case "Data Science":
                    totalValuePurchase += 229.99;
                    break;
                case "UI & UX Desing":
                    totalValuePurchase += 174.99;
                    break;
                case "Programming Basis":
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
        }
    }

updateCart()

// Função para processar a compra dos cursos
function Buy() {
    // Verificar se há usuário logado
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
        alert("Você precisa estar logado para fazer a compra!");
        window.location.href = "http://localhost:3000/Login/login.html";
        return;
    }

    // Obter o carrinho
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Dados do usuário para enviar ao backend
    const userData = {
        nomeCompleto: loggedUser.userName,
        emailEducacional: loggedUser.email,
        tp1: "ND",
        tp2: "ND",
        tp3: "ND", 
        assesment: "ND"
    };

    // Mapeamento dos cursos para os endpoints do backend
  

    // Processar cada curso no carrinho
    cart.forEach(item => {
        const endpoint = item.ProductNameCart;
        if (endpoint) {
            fetch(`http://localhost:8080/cursos/${endpoint}/adicionar`, {
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
                } else {
                    console.error(`Erro ao adicionar aluno ao curso ${item.ProductNameCart}:`, data.mensagem);
                }
            })
            .catch(error => {
                console.error(`Erro na requisição para o curso ${item.ProductNameCart}:`, error);
            });
        }
    });

    // Limpar o carrinho e mostrar mensagem de sucesso
    localStorage.removeItem("cart");
    alert("Compra realizada com sucesso! Você foi inscrito nos cursos selecionados.");
    window.location.reload();
}