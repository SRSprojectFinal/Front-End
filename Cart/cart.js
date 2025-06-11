let frontEndCourse = document.querySelector(".frontEndCourse");
let backEndCourse = document.querySelector(".backEndCourse");
let mobileCourse = document.querySelector(".mobileCourse");
let dataScienceCourse = document.querySelector(".dataScienceCourse");
let UiAndUxCourse = document.querySelector(".uiAndUxCourse");
let programmingBasisCourse = document.querySelector(".programmingBasisCourse");

let cartTotalValue = document.querySelector(".cartTotalValue");
let cartTotalPurchase = document.querySelector(".cartTotalPurchase");

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

    }

updateCart()