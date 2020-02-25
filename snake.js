/* Handles the Snake game */
class Game {
  /**
   * Creates a new game
   * @param width - width of the gameboard
   * @param height - height of the gameboard
   */
  constructor(width, height) {
    this.width = width;   // width of board
    this.height = height; // height of board

    // reference to gameboard element
    this.gameboard = document.getElementById('gameboard');

    // array holding the grid
    this.grid = [];

    // initialize the game
    this.init();
  }

  /**
   * Initializes the gameboard
   */
  init() {
    this.createBoard(this.width, this.height);
    this.spawnWifi();
  }

  /**
   * Creates the gameboard out of the given rows and columns
   * @param row - the number of rows in the gameboard
   * @param cols - the number of columns in the gameboard
   */
  createBoard(rows, cols) {
    // style gameboard with correct number of rows and columns
    this.gameboard.style.setProperty('--grid-rows', rows);
    this.gameboard.style.setProperty('--grid-cols', cols);

    // create each cell of the board
    for (let c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      this.gameboard.appendChild(cell).className = "grid-item";

      // add cell to the game grid
      this.grid.push(cell);
    };
  };

  /**
   * Set given cell
   * reverse is:
   * x = i % width
   * y = i / width
   *
   * @param x - the x position of the cell
   * @param y - the y position of the cell
   * @param symbol - the new text to set
   */ 
  setCell(x, y, symbol) {
    this.grid[x + this.width * y].innerText = symbol;
  }

  /**
   * Randomly spawns a wifi signal
   */ 
  spawnWifi() {
    // obtain a random x and y pos
    let randX = Math.floor(Math.random() * this.width),
        randY = Math.floor(Math.random() * this.height);

    // spawn the wifi
    this.setCell(randX, randY, 'W');
  }
}

// start the game with a 16 by 16 square grid
let game = new Game(16, 16);
