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
    this.tickRate = 500;  // time between game ticks in milliseconds

    // reference to gameboard element
    this.gameboard = document.getElementById('gameboard');

    // array holding the grid
    this.grid = [];

    // initialize the game
    this.init();

    // start the game
    this.beginGame();
  }

  /**
   * Initializes the gameboard
   */
  init() {
    this.createBoard(this.width, this.height);
    this.spawnWifi();
  }

  /**
   * Begin the main gameplay loop
   */ 
  beginGame() {
    window.setInterval(() => {
      this.gameplayLoop();
    }, this.tickRate);
  }

  /**
   * The all mighty game play loop!
   */
  gameplayLoop() {
    this.clearBoard();
    this.spawnWifi();
  }

  /**
   * Clears the board of all text
   */
  clearBoard() {
    this.grid.forEach(cell => {
      cell.innerText = '';
    });
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
   * Returns the cell at the given x and y position
   */ 
  getCell(x, y) {
    return this.grid[x + this.width * y];
  }

  /**
   * Returns a random cell
   * @return A random cell
   */
  getRandomCell() {
    return this.grid[Math.floor(Math.random() * this.grid.length)];
  }

  /**
   * Checks if the cell is empty
   * @return true if the cell is empty. False otherwise
   */
  isCellEmpty(cell) {
    return cell.innerText === '';
  }

  /**
   * Randomly spawns a wifi signal in a free spot
   */ 
  spawnWifi() {
    let cell;
    while(!this.isCellEmpty(cell = this.getRandomCell())) {}
    cell.innerText = 'W';
  }
}

/* The snake itself */
class Snake {
  constructor() {}
}

// start the game with a 16 by 16 square grid
let game = new Game(16, 16);
