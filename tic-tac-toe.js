let currentPlayer = "X";
let gameIsOver = false;

const fields = document.querySelectorAll(".field__item");
const scoreX = document.querySelector(".score-1");
const scoreO = document.querySelector(".score-2");
const restartBtn = document.querySelector(".restart");
const bottom = document.querySelector(".bottom");
const scoreDraw = document.querySelector(".score-draw");

fields.forEach(function (elem) {
  elem.addEventListener("click", handleClick);
});
restartBtn.addEventListener("click", handleRestart);

let winPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function handleClick(event) {
  let field = event.target;
  if (field.innerHTML == "" && !gameIsOver) {
    field.innerHTML = currentPlayer;
    checkWin();
    checkDraw();
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  }
}

function checkWin() {
  winPositions.forEach(function (arr) {
    let id1 = arr[0];
    let id2 = arr[1];
    let id3 = arr[2];
    let field1 = document.getElementById(id1);
    let field2 = document.getElementById(id2);
    let field3 = document.getElementById(id3);
    if (
      field1.innerHTML == currentPlayer &&
      field2.innerHTML == currentPlayer &&
      field3.innerHTML == currentPlayer
    ) {
      gameIsOver = true;
      field1.classList.add("win");
      field2.classList.add("win");
      field3.classList.add("win");
      handleWin(currentPlayer);
    }
  });
}

function handleWin(winner) {
  setTimeout(function () {
    alert(`Победил игрок ${winner}`);
    bottom.classList.remove("hidden");
  }, 500);
  if (winner == "X") {
    scoreX.innerHTML = +scoreX.innerHTML + 1;
  } else {
    scoreO.innerHTML = +scoreO.innerHTML + 1;
  }
}

function checkDraw() {
  let isDraw = true;
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].innerHTML == "") {
      isDraw = false;
      break;
    }
  }
  if (isDraw) {
    setTimeout(function () {
      alert("Ничья!");
      bottom.classList.remove("hidden");
    }, 500);
    scoreDraw.innerHTML = +scoreDraw.innerHTML + 1;
  }
}

function handleRestart() {
  currentPlayer = "X";
  gameIsOver = false;
  fields.forEach(function (item) {
    item.innerHTML = "";
    item.classList.remove("win");
  });
  bottom.classList.add("hidden");
}
