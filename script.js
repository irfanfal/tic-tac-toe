
const startBTN = document.getElementById("start-button");
const form = document.getElementById("my-form");
const form_container = document.querySelector(".form-container");
const submitBTN = document.getElementById("submit")
const gameboard = document.querySelector(".game-board")
const control = document.querySelector(".controls")



startBTN.addEventListener("click", (event) => {
    event.preventDefault();
    form_container.style.display = "block";
    control.style.display = "none";
})


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    form_container.style.display = "none";
    gameboard.style.display = "grid";
    initializeGame(data);
});



const initializeVariables = (data) => {
    
    data.mode = parseInt(data.mode);
    data.board = [0,1,2,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
}


const addEventListenerToGameBoard = (data) =>{
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", (event) => {
            playMove(event.target,data)
        })
    })
}

const initializeGame = (data) => {
    initializeVariables(data);
    
    addEventListenerToGameBoard(data);

}

const playMove = (cell, data) => {
    if(data.gameOver || data.round > 8){
        return;
    }
    if(data.board[cell.id] === "X" || data.board[cell.id] === "O"){
        return;
    }


    data.board[cell.id] = data.currentPlayer;
    cell.textContent = data.currentPlayer;
    cell.classList.add(data.currentPlayer === "X" ? "player1" : "player2");


    data.round++;
    console.log(cell, data);

    
}