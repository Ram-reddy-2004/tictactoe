const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const startRestartButton = document.getElementById('start-restart');
const popup = document.getElementById('win-popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');
const flowerAnimation = document.getElementById('flower-animation');
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] !== "" || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    let winningSequence = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningSequence = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} has won!`;
        gameActive = false;
        startRestartButton.textContent = "Restart Game";
        showWinningLine(winningSequence);
        showPopup(`${currentPlayer} Wins!`);
        celebrateWin();
        return;
    } else if (!gameBoard.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        startRestartButton.textContent = "Restart Game";
        return;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function showWinningLine(cells) {
    cells.forEach(index => {
        board[index].style.backgroundColor = "green";  // Highlight winning cells in green
    });
}

function showPopup(message) {
    popupText.textContent = message;
    popup.classList.remove('hidden');
}

function celebrateWin() {
    flowerAnimation.classList.remove('hidden');
    setTimeout(() => {
        flowerAnimation.classList.add('hidden');
    }, 3000); // Hide flower animation after 3 seconds
}

popupClose.addEventListener('click', () => {
    popup.classList.add('hidden');
});

function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    board.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "";  // Reset cell background color
    });
    statusText.textContent = `It's ${currentPlayer}'s turn`;
}

function startGame() {
    gameActive = true;
    startRestartButton.textContent = "Restart Game";
    resetGame();
    document.getElementById('board').style.pointerEvents = "auto"; // Enable clicks on the board
}

board.forEach(cell => cell.addEventListener('click', handleClick));
startRestartButton.addEventListener('click', startGame);
