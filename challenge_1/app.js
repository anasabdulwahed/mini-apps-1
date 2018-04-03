var App = {};

App.init = function() {
  this.map = [] //Maps html element to position on board
  this.symbols = ['X', 'O'];
  this.init = true;
  this.inSession = false;
  this.board = this.createBoard(true);
  this.boardEnabled = false;
  this.addEventListeners();
}

App.createBoard = function(init) {  
  var board = [];
  var boardRow = [];
  
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (init) {
        this.map.push([i, j]);
      }
      boardRow.push(null);
    }
    board.push(boardRow);
    boardRow = [];
  }
  return board;
}

App.addEventListeners = function() {
  var handleAction = this.handleAction.bind(this);
  var setPlayers = this.setPlayers.bind(this);
  var reset = this.reset.bind(this);

  document.addEventListener('click', function(e) {
    if (e.target.className === 'cell') {
      handleAction(e.target);
    } else if (e.target.id === 'reset'){
      reset();
    }
  });
  
  document.addEventListener('submit', function(e) {
    e.preventDefault();
    player1 = document.getElementById("input1").value.trim();
    player2 = document.getElementById("input2").value.trim();
    setPlayers(player1, player2);
  })
}

App.setPlayers = function(player1, player2) {
  if (!this.init) {
    console.log('Players already set');
    return;
  }
  
  player1 = player1 ? player1 : 'Player1';
  player2 = player2 ? player2 : 'Player2';

  this.players = [
    {name: player1, symbol: this.symbols[0], wins: 0, losses:0}, 
    {name: player2, symbol: this.symbols[1], wins: 0, losses:0}
  ];
  
  this.renderPlayerInfo();

  this.activeId = false;
  this.activePlayer = this.players[+this.activeId];

  document.getElementById('message').textContent = `It is ${this.activePlayer.name}'s turn`;

  this.boardEnabled = true;
  this.init = false;
}

App.renderPlayerInfo = function() {
  document.getElementById('player1').textContent = `Player 1 (${this.players[0].symbol}): ${this.players[0].name}`;
  document.getElementById('player2').textContent = `Player 2 (${this.players[1].symbol}): ${this.players[1].name}`;
  document.getElementById('score1').textContent = `${this.players[0].name}: ${this.players[0].wins} wins and ${this.players[0].losses} losses`;
  document.getElementById('score2').textContent = `${this.players[1].name}: ${this.players[1].wins} wins and ${this.players[1].losses} losses`;
}

App.handleAction = function(cell) {
  
  if (!this.boardEnabled) {
    console.log('Board Disabled');
    return;
  }
  this.inGame = true;
  var coordinates = this.placeOnBoard(cell);
  if (!coordinates) {
    console.log('Cannot place here');
    return;
  }
  var [row, col] = coordinates;
  console.log(coordinates)
  if (this.didWin(row, col)) {
    this.endGame();
  } else if (this.isDraw()){
    this.endGame(true);
  } else {
    this.activeId = !this.activeId;
    this.activePlayer = this.players[+this.activeId];
    document.getElementById('message').textContent = `It is ${this.activePlayer.name}'s turn`;
  }
}

App.isDraw = function() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (!this.board[i][j]) {
        return false;
      }
    }
  }
  return true;
}

App.endGame = function(wasDraw) {
  
  var endMsg = '';
  if (wasDraw) {
    endMsg = `It's a draw!`;
  } else {
    endMsg = `${this.activePlayer.name} wins!`;
    var winner = this.activePlayer;
    var loser = this.players[+!this.activeId];
    ++winner.wins;
    ++loser.losses;
  }
  document.getElementById('message').textContent = endMsg;
  this.renderPlayerInfo();
  this.boardEnabled = false;
  this.inGame = false;  
}

// Cell is html DOM element
App.placeOnBoard = function(cell) {
  var cellId = cell.id;
  var index = parseInt(cellId[cellId.length-1])
  var coordinates = this.map[index];
  var [row, col] = coordinates;
  if (this.board[row][col]) {
    return false;
  }
  this.board[row][col] = this.activePlayer.symbol;
  cell.textContent = this.activePlayer.symbol;
  return coordinates;
}

App.didWin = function(row, col) {
  return this.winInColumn(col) || this.winInRow(row) || this.winInDiagonals();
}

App.winInColumn = function(col) {
  for (var i = 0; i < 3; i++) {
    if (this.board[i][col] !== this.activePlayer.symbol) {
      return false;
    }
  }
  return true;
}

App.winInRow = function(row) {
  for (var i = 0; i < 3; i++) {
    if (this.board[row][i] !== this.activePlayer.symbol) {
      return false;
    }
  }
  return true;
}

App.winInDiagonals = function() {
  return this.winInMajorDiagonal() || this.winInMinorDiagonal();
}

App.winInMajorDiagonal = function() {
  for (var i = 0; i < 3; i++) {
    if (this.board[i][2-i] !== this.activePlayer.symbol) {
      return false;
    }
  }
  return true;
}

App.winInMinorDiagonal = function() {
  for (var i = 0; i < 3; i++) {
    if (this.board[i][i] !== this.activePlayer.symbol) {
      return false;
    }
  }
  return true;
}

App.resetBoardDOM = function() {
  var cells = document.getElementById('board').children;
  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

App.reset = function() {
  if (this.inGame) {
    this.activeId = false;
    this.activePlayer = this.players[+this.activeId];
  }
  document.getElementById('message').textContent = `It is ${this.activePlayer.name}'s turn`;
  this.board = this.createBoard(false);
  this.resetBoardDOM();
  this.boardEnabled = true;
}

window.App = App;
