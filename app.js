document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const width = 4;
  let squares = [];
  let score = 0;

  const button = document.getElementById("newgame");
  button.addEventListener("click", () => {
    window.localStorage.removeItem("2048Data");
    squares = [];
    score = 0;
    scoreDisplay.innerHTML = 0;
    gridDisplay.textContent = "";
    createBoard(null);
  });

  function saveGrid() {
    const gridValues = [];
    for (let i = 0; i < squares.length; i++) {
      gridValues.push(squares[i].innerHTML);
    }
    const data = { gridValues, score };
    window.localStorage.setItem("2048Data", JSON.stringify(data));
  }

  function getGrid() {
    const data = JSON.parse(window.localStorage.getItem("2048Data"));
    if (data) {
      score = data.score;
      scoreDisplay.innerHTML = score;
    }
    console.log(data);
    createBoard(data);
  }
  getGrid();
  //create a playing board
  function createBoard(data) {
    if (data) {
      console.log(data.gridValues);
      for (let i = 0; i < width * width; i++) {
        square = document.createElement("div");
        square.innerHTML = data.gridValues[i];
        gridDisplay.appendChild(square);
        squares.push(square);
      }
      console.log(squares);
    } else {
      for (let i = 0; i < width * width; i++) {
        square = document.createElement("div");
        square.innerHTML = 0;
        gridDisplay.appendChild(square);
        squares.push(square);
      }
      generate();
      generate();
    }
  }

  //generate a number randomly
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else generate();
  }

  //swipe right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //swipe right
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;

      const column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      const filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + 4].innerHTML = newColumn[1];
      squares[i + 8].innerHTML = newColumn[2];
      squares[i + 12].innerHTML = newColumn[3];
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;

      const column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      const filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function combinedRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineColumnsUp() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        const combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineColumnsDown() {
    for (let i = 15; i >= 4; i--) {
      if (squares[i].innerHTML === squares[i - width].innerHTML) {
        const combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i - width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function control(e) {
    if (e.keyCode === 37) keyLeft();
    else if (e.keyCode === 38) keyUp();
    else if (e.keyCode === 39) keyRight();
    else if (e.keyCode === 40) keyDown();
  }
  document.addEventListener("keyup", control);

  function keyLeft() {
    moveLeft();
    combinedRow();
    moveLeft();
    generate();
    saveGrid();
  }

  function keyUp() {
    moveUp();
    combineColumnsUp();
    moveUp();
    generate();
    saveGrid();
  }
  function keyRight() {
    moveRight();
    combinedRow();
    moveRight();
    generate();
    saveGrid();
  }

  function keyDown() {
    moveDown();
    combineColumnsDown();
    moveDown();
    generate();
    saveGrid();
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You Win!";
        document.removeEventListener("keyup", control);
        setTimeout(() => clear(), 3000);
      }
    }
  }

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) zeros++;
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "You Lost";
      document.removeEventListener("keyup", control);
      setTimeout(() => clear(), 3000);
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer);
  }

  var myTimer = setInterval(addColours, 50);

  //add colours
  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0)
        squares[i].style.backgroundColor = "#afa192";
      else if (squares[i].innerHTML == 2)
        squares[i].style.backgroundColor = "#eee4da";
      else if (squares[i].innerHTML == 4)
        squares[i].style.backgroundColor = "#ede0c8";
      else if (squares[i].innerHTML == 8)
        squares[i].style.backgroundColor = "#f2b179";
      else if (squares[i].innerHTML == 16)
        squares[i].style.backgroundColor = "#ffcea4";
      else if (squares[i].innerHTML == 32)
        squares[i].style.backgroundColor = "#e8c064";
      else if (squares[i].innerHTML == 64)
        squares[i].style.backgroundColor = "#ffab6e";
      else if (squares[i].innerHTML == 128)
        squares[i].style.backgroundColor = "#fd9982";
      else if (squares[i].innerHTML == 256)
        squares[i].style.backgroundColor = "#ead79c";
      else if (squares[i].innerHTML == 512)
        squares[i].style.backgroundColor = "#76daff";
      else if (squares[i].innerHTML == 1024)
        squares[i].style.backgroundColor = "#beeaa5";
      else if (squares[i].innerHTML == 2048)
        squares[i].style.backgroundColor = "#d7d4f0";
    }
  }
  addColours();
});
