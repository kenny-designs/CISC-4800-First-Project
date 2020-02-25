/* Handles the Snake game */
class Game {
  /**
   * Creates a new game
   * @param width - width of the gameboard
   * @param height - height of the gameboard
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameboard = document.getElementById('gameboard');

    this.init();
  }

  /**
   * Initializes the gameboard
   */
  init() {
    this.createBoard(this.width, this.height);
  }

  /**
   * Creates the gameboard out of the given rows and columns
   * @param row - the number of rows in the gameboard
   * @param cols - the number of columns in the gameboard
   */
  createBoard(rows, cols) {
    this.gameboard.style.setProperty('--grid-rows', rows);
    this.gameboard.style.setProperty('--grid-cols', cols);
    for (let c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      //cell.innerText = (c + 1);
      cell.innerText = '4';
      this.gameboard.appendChild(cell).className = "grid-item";
    };
  };

}

// start the game with a 16 by 16 square grid
let game = new Game(16, 16);
