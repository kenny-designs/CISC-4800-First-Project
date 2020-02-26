/**
 * A point in 2D space
 */ 
class Point2D {
  /**
   * Creates a point at the given coords
   * @param x - the x coord
   * @param y - the y coord
   */ 
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Check if two points are equal
   * @param point - the other point
   */
  isEqual(point) {
    return this.x === point.x &&
           this.y === point.y;
  }
}

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
    this.tickRate = 250;  // time between game ticks in milliseconds

    // reference to gameboard element
    this.gameboard = document.getElementById('gameboard');

    // array holding the grid
    this.grid = [];

    // the snake itself
    this.snake = new Snake(this);

    // cell with the wifi symbol
    this.wifiCell;

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
    this.setupListeners();
  }

  /**
   * Setup event listeners for controls
   */ 
  setupListeners() {
    // update snake's direction based on keypress
    document.addEventListener('keypress', e => {
      this.snake.changeDirection(e);
    });
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
    // wipe the board
    this.clearBoard();

    // update the snake
    this.snake.updatePos();
    this.snake.collisionCheck();
    this.snake.drawSnake();
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
   * Set the text of the given cell
   *
   * @param point - the x and y position of the cell
   * @param symbol - the new text to set
   */ 
  setCell(point, symbol) {
    this.grid[point.x + this.width * point.y].innerText = symbol;
  }

  /**
   * Returns the cell at the given x and y position
   *
   * @param point - the x and y position of the cell to get
   */ 
  getCell(point) {
    return this.grid[point.x + this.width * point.y];
  }

  /**
   * Returns a random empty cell
   *
   * @return An empty cell
   */ 
  getRandomEmptyCell() {
    // TODO: we don't need the point. Make it simpler
    let cell,
        point = new Point2D(0,0);

    // look for an empty cell
    while(true) {
      point.x = Math.floor(Math.random() * this.width);
      point.y = Math.floor(Math.random() * this.height);

      cell = this.getCell(point);

      // found it!
      if(this.isCellEmpty(cell)) break;
    }
    return point;
  }

  /**
   * Checks if the cell has no inner text
   *
   * @return true if the cell is empty. False otherwise
   */
  isCellEmpty(cell) {
    return cell.innerText === '';
  }

  /**
   * Randomly spawns a WiFi signal in a free spot
   */ 
  spawnWifi() {
    if(this.wifiCell) {
      this.getCell(this.wifiCell).classList.remove('wifi-svg');
    }

    this.wifiCell = this.getRandomEmptyCell();
    this.getCell(this.wifiCell).classList.add('wifi-svg');
  }

  /**
   * Get the WiFi cell
   *
   * @return the WiFi cell
   */
  getWifi() {
    return this.wifiCell;
  }
}

/* The snake itself */
class Snake {
  /**
   * Construct a new snake
   */ 
  constructor(board) {
    // reference to the board itself
    this.board = board;

    // body of the snake with the head in the center
    this.body = [new Point2D(this.board.width / 2, this.board.height / 2)];

    // TODO: testing growing body
    this.body.push(new Point2D(7, 8),
                   new Point2D(6, 8));

    // directions the snake can travel in
    this.directions = {
      LEFT: 0,
      RIGHT: 1,
      UP: 2,
      DOWN: 3
    };

    // the current direction the snake is traveling in
    this.curDir = this.directions.RIGHT;
  }

  /**
   * Grow the snake
   */
  growBody() {
    this.body.push(new Point2D(this.head.x, this.head.y));
  }

  /**
   * Gets the head of the snake
   *
   * @return head of the snake
   */ 
  get head() {
    return this.body[0];
  }

  /**
   * Set the head of the snake
   *
   * @param newHead - the new head of the snake
   */ 
  set head(newHead) {
    this.body[0] = newHead;
  }

  /**
   * Gets the tail of the snake
   *
   * @return tail of the snake
   */ 
  get tail() {
    return this.body[this.body.length - 1];
  }

  /**
   * Set the tail of the snake
   *
   * @param newTail - the new tail of the snake
   */ 
  set tail(newTail) {
    this.body[this.body.length - 1] = newTail;
  }

  /**
   * Removes the tail from the snake and returns it
   *
   * @return Tail of the snake
   */
  popTail() {
    this.body.pop();
  }

  /**
   * Swaps the tail to the front of the array
   */
  swapTailToFront() {
    let tail = this.body.pop();
    tail.x = this.head.x;
    tail.y = this.head.y;
    this.body.unshift(tail);
  }

  /**
   * Updates the snakes position
   */ 
  updatePos() {
    this.swapTailToFront();

    switch(this.curDir) {
      case this.directions.LEFT:
        this.body[0].x--;
        break;

      case this.directions.RIGHT:
        this.body[0].x++;
        break;

      case this.directions.UP:
        this.body[0].y--;
        break;

      case this.directions.DOWN:
        this.body[0].y++;
        break;
    }
  }

  /**
   * Draw the body
   */
  drawSnake() {
    this.body.forEach((point, index) => {
      this.board.setCell(point, index % 2 === 0 ? '0' : '4');
    });

    this.board.setCell(this.head, '#');
  }

  /**
   * Change the snake's direction
   */
  changeDirection(keyEvent) {
    switch(keyEvent.key) {
      case 'w':
        this.curDir = this.directions.UP;
        break;

      case 'a':
        this.curDir = this.directions.LEFT;
        break;

      case 's':
        this.curDir = this.directions.DOWN;
        break;

      case 'd':
        this.curDir = this.directions.RIGHT;
        break;
    }
  }

  /**
   * Check if the snake collided with anything
   */
  collisionCheck() {
    // check for wall collision
    if (this.body[0].x < 0 ||
        this.body[0].x >= this.board.width ||
        this.body[0].y < 0 ||
        this.body[0].y >= this.board.height) {
      console.log('game over!');
    }

    // check for body collision
    /* TODO: add body checking code */

    // check for wifi
    if(this.board.getWifi().isEqual(this.body[0])) {
      this.growBody();
      this.board.spawnWifi();
    }
  }
}

// start the game with a 16 by 16 square grid
let game = new Game(16, 16);
