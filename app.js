window.addEventListener("load", app)

let gameBoard = ["","","","","","","","",""];

let turn = 1;

let winner = false;
let tie = false;

//create player
const player = (name) =>{
    name = name;
    return {name};
}

let playerX = player("");
let playerY = player("");

//initialize the app
function app() {
    let inputField = document.querySelector(".input-field").focus()
    console.log(inputField);

    document.getElementById("player-form").addEventListener("submit", addPlayers)

    document.querySelector(".replay-btn").addEventListener("click", resetBoard)
}

//add players
function addPlayers(event) {    
    event.preventDefault();
    
    if(this.player1.value === "" || this.player2.value === "") {
        alert("You must enter a name for each player")
        return
    }

    const playerFormContainer = document.querySelector(".enter-players")
    const boartdMain = document.querySelector(".board__main")
    playerFormContainer.classList.add("hide-container")
    boartdMain.classList.remove("hide-container")

    playerX.name = this.player1.value
    playerY.name = this.player2.value
    
    resetBoard();
    
    // console.log("playerFormContainer: "+playerFormContainer);
    // console.log("boartdMain: "+boartdMain);
    // console.log("playerX.name: "+playerX.name);
    // console.log("playerY.name: "+playerY.name);
}

//return current player
function currentPLayer() {
    return turn %2 === 0 ? "O" : "X"
}

//Resize squares
/*
window.addEventListener("resize", onResize);

function onResize() {
    let allCells = document.querySelectorAll(".board__cell")
    let cellHeight = allCells[0].offsetWidth

    allCells.forEach((cell) =>{
        cell.style.height = `${cellHeight}px`
    })
}*/

/*build board
function buildBoard() {
    document.querySelector(".reset").classList.remove("reset--hidden");
    resetBoard();
}*/

//cell click event for player to attempt to make move
function makeMove(event) {
    let currentCell = parseInt(event.currentTarget.firstElementChild.dataset.id);
    // console.log("currentCell:" + currentCell);

    let cellToAddToken = document.querySelector('[data-id="'+currentCell+'"]')
    // console.log("cellToAddToken:" + cellToAddToken);

    if(cellToAddToken.innerHTML !== "") {
        alert("This cell is already taken");
        return;

    }else {
        if(currentPLayer() ==='X') {
            cellToAddToken.textContent=currentPLayer();
            gameBoard[currentCell] = 'X'
        }else {
            cellToAddToken.textContent=currentPLayer();
            gameBoard[currentCell] = 'O'
        }
    }
    isWinner();
    isTie();
    if(!winner && !tie ) {        
        turn++;
        changeBoardHeaderNames();        
        console.log("turn №:" + turn);
        console.log("Current Player:" + currentPLayer());
    }
}

function isTie() {
    if(turn > 8) {
        alert('game over a tie')
        tie = true;
        removeCellClickListener();
    }
    console.log("tie:" + tie);
}
function isWinner() {
    const winningSequences = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],        
        [0,4,8],
        [2,4,6]
    ]
    winningSequences.forEach((winningCombos) => {
        let cell1 = winningCombos[0]
        let cell2 = winningCombos[1]
        let cell3 = winningCombos[2]

        if (
            gameBoard[cell1] === currentPLayer() &&
            gameBoard[cell2] === currentPLayer() &&
            gameBoard[cell3] === currentPLayer()
            ) {
            const cells = document.querySelectorAll('.board__cell');

            cells.forEach((cell) => {
                let cellId = cell.firstElementChild.dataset.id
                if(cellId == cell1 || cellId == cell2 || cellId == cell3) {
                    cell.classList.add('board__cell--winner')
                }
            })
            let currentPLayerText = document.querySelector('.board___player-turn')
            if(currentPLayer() === 'X') {
                currentPLayerText.innerHTML='<div class="congratulations"> Congratulations '+playerX.name+'! YOU WIN! </div>'
            } else {
                currentPLayerText.innerHTML='<div class="congratulations"> Congratulations '+playerY.name+'! YOU WIN!</div>'
            }
            
            removeCellClickListener();
            winner = true;
            return true
        }
    })
    return false;
}
function changeBoardHeaderNames() {
    if(!winner) {
        let currentPLayerText = document.querySelector(".board___player-turn")
        if(currentPLayer() === 'X') {
            currentPLayerText.innerHTML = '<span class="name--style">'+playerX.name+' </span>, you are up!  <div class="u-r-winner"></div>'
        } else {
            currentPLayerText.innerHTML = '<span class="name--style">'+playerY.name+' </span>, you are up!  <div class="u-r-winner"></div>'
        }
    }
}

function resetBoard() {
    console.log('resetting')
    console.log("turn №:" + turn);
    console.log("Current Player:" + currentPLayer());

    gameBoard = ["","","","","","","","",""];

    let cellToAddToken = document.querySelectorAll(".letter");
    cellToAddToken.forEach((square) => {
        square.textContent= ""
        square.parentElement.classList.remove("board__cell--winner")
    })

    turn = 1;
    winner = false
    tie=false
    let currentPLayerText = document.querySelector(".board___player-turn")
    currentPLayerText.innerHTML = ' <span class="name--style">'+playerX.name+' </span>, you are up!  <div class="u-r-winner"></div>  ';
    document.querySelector(".reset").classList.remove("reset--hidden");
    addCellClickListener();
}

function addCellClickListener() {
    const cells = document.querySelectorAll(".board__cell")
    cells.forEach((cell) => {
        cell.addEventListener('click', makeMove)
    })
}

function removeCellClickListener() {
    let allCells = document.querySelectorAll('.board__cell')
    allCells.forEach((cell) => {
        cell.removeEventListener('click', makeMove)
    })
}