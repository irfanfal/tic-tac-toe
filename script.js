
const startBTN = document.getElementById("start-button");
const form = document.getElementById("my-form");
const form_container = document.querySelector(".form-container");
const submitBTN = document.getElementById("submit")
const gameboard = document.querySelector(".game-board")
const control = document.querySelector(".controls")

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];



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

    console.log(typeof(data.board[cell.id]))

    if(endConditions(data)){
        return
    }
   
    if(data.mode === 0){
         changePlayer(data)
    }else if(data.mode === 1){
        AiMove(data);
        data.currentPlayer = "X";
    }

    

}



const checkWinner = (data) => {
    let result = false;
    winConditions.forEach(condition => {
        if(data.board[condition[0]] === data.board[condition[1]] && 
            data.board[condition[1]] === data.board[condition[2]]){
            console.log("player won");
            data.gameOver = true;
            result = true;
        }
    });
    return result;

}

const endConditions = (data) => {
    if(checkWinner(data)){
        return true;
    }else if(data.round === 9){
        return true;
    }
}


const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
}

const AiMove = (data) => {
    changePlayer(data);

    data.round++;
    let availableSpaces = data.board.filter(
      (space) => space !== "X" && space !== "O"
    );
    let move =
      availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    data.board[move] = data.player2;
    setTimeout(() => {
      let box = document.getElementById(`${move}`);
      box.textContent = data.player2;
      box.classList.add("player2");
    }, 200);
  
    if (endConditions(data)) {
      return;
    }
    changePlayer(data);
};


// const adjustDom = (className, textContent) => {
//     document.querySelector(`.${className}`).setAttribute()
// }