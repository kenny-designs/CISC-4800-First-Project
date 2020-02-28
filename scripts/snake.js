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
    this.width      = width;  // width of board
    this.height     = height; // height of board
    this.tickRate   = 250;    // time between game ticks in milliseconds
    this.isGameover = false;  // track if the player lost
    this.intervalID = null;   // ID for the interval driving the game loop

    // get references to DOM elements
    this.gameboard      = document.getElementById('gameboard');
    this.restartButton  = document.getElementById('restart-button');
    this.gameOverScreen = document.getElementById('game-over-screen');

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
   * Initialize the game
   */
  init() {
    this.createBoard(this.width, this.height);
    this.setupListeners();
    this.snake.createSnake();
    this.spawnWifi();
  }

  /**
   * Setup event listeners for controls
   */ 
  setupListeners() {
    // update snake's direction based on keydown
    document.addEventListener('keydown', e => {
      this.snake.changeDirection(e);
    });

    // listener for restarting the game
    this.restartButton.addEventListener('click', this.restartGame.bind(this));
  }

  /**
   * Begin the main gameplay loop
   */ 
  beginGame() {
    this.intervalID = window.setInterval(() => {
      this.gameplayLoop();
    }, this.tickRate);
  }

  /**
   * Restarts the game
   */
  restartGame(e) {
    this.gameOverScreen.style.display = 'none';
    this.snake.createSnake();
    this.spawnWifi();
    this.isGameover = false;
  }

  /**
   * The all mighty game play loop!
   */
  gameplayLoop() {
    // do nothing if the game is over
    if(this.isGameover) return;

    // wipe the board
    this.clearBoard();

    // update the snake
    this.snake.drawSnake();
    this.snake.updatePos();
    this.snake.collisionCheck();
  }

  /**
   * End the game
   */ 
  endGame() {
    this.isGameover = true;
    this.gameOverScreen.style.display = 'block';
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
    this.board = board; // reference to the game board
    this.body  = [];    // array of Point2D's for the snake's body

    // directions the snake can travel in
    this.directions = {
      LEFT: 0,
      RIGHT: 1,
      UP: 2,
      DOWN: 3
    };

    // key mapping
    // TODO: look into an array of dictionaries/maps
    this.keyMap = {
      'ArrowLeft':  this.directions.LEFT,
      'ArrowRight': this.directions.RIGHT,
      'ArrowUp':    this.directions.UP,
      'ArrowDown':  this.directions.DOWN,
      'a':          this.directions.LEFT,
      'd':          this.directions.RIGHT,
      'w':          this.directions.UP,
      's':          this.directions.DOWN
    };
  }

  /**
   * Create a new snake in the middle of the screen with default settings
   */ 
  createSnake() {
    // body of the snake with the head in the center
    let midX = this.board.width / 2,
        midY = this.board.height / 2;

    // create head and tail
    this.body = [new Point2D(midX, midY), new Point2D(midX - 1, midY)];

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

    // move the head based on the current moving direction
    if     (this.curDir === this.directions.LEFT)  this.head.x--;
    else if(this.curDir === this.directions.RIGHT) this.head.x++;
    else if(this.curDir === this.directions.UP)    this.head.y--;
    else                                           this.head.y++;
  }

  /**
   * Draw the body
   */
  drawSnake() {
    this.body.forEach((point, index) => {
      this.board.setCell(point, index % 2 === 0 ? '0' : '4');
    });

    // make the head with #
    this.board.setCell(this.head, '#');
  }

  /**
   * Change the snake's direction
   */
  changeDirection(keyEvent) {
    // TODO: sanitize input

    let dir = this.keyMap[keyEvent.key];

    // prevent the snake from moving back into its body
    if (dir + this.curDir === this.directions.LEFT + this.directions.RIGHT ||
        dir + this.curDir === this.directions.UP + this.directions.DOWN) return;

    this.curDir = dir;
  }

  /**
   * Check if the snake collided with anything
   */
  collisionCheck() {
    this.wallCheck();
    this.bodyCheck();
    this.wifiCheck();
  }

  /**
   * Check for wall collisions
   */
  wallCheck() {
    if (this.body[0].x < 0 || this.body[0].x >= this.board.width ||
        this.body[0].y < 0 || this.body[0].y >= this.board.height) {
      this.board.endGame();
      console.log('game over!');
    }
  }

  /**
   * Check if the snake ran into its own body
   */
  bodyCheck() {
    this.body.forEach((point, index) => {
      if(point.isEqual(this.head) && index !== 0) {
        this.board.endGame();
        console.log('game over from body!');
      }
    });
  }

  /**
   * Check if the snake hit a wifi signal
   */ 
  wifiCheck() {
    if(this.board.getWifi().isEqual(this.body[0])) {
      this.growBody();
      this.board.spawnWifi();
    }
  }
}

// start the game with a 16 by 16 square grid
let game = new Game(16, 16);
