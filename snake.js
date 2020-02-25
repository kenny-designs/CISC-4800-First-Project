const gameboard = document.getElementById('gameboard');

function makeRows(rows, cols) {
  gameboard.style.setProperty('--grid-rows', rows);
  gameboard.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c + 1);
    gameboard.appendChild(cell).className = "grid-item";
  };
};

makeRows(16, 16);
