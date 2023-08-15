
const startBTN = document.getElementById("start-button");
const form = document.getElementById("my-form");
const submitBTN = document.getElementById("submit")
const gameboard = document.querySelector(".game-board")
const control = document.querySelector(".controls")



startBTN.addEventListener("click", (event) => {
    event.preventDefault();
    form.style.display = "grid";
    control.style.display = "none";
})


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    form.style.display = "none";
    gameboard.style.display = "grid";
    console.log(data);
})