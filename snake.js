const gameboard = document.getElementById('gameboard');

/*
 * Creates the gameboard out of the given rows and columns
 * @param row - the number of rows in the gameboard
 * @param cols - the number of columns in the gameboard
 */
function makeRows(rows, cols) {
  gameboard.style.setProperty('--grid-rows', rows);
  gameboard.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);
    cell.innerText = '4';
    gameboard.appendChild(cell).className = "grid-item";
  };
};

makeRows(16, 16);
