class App extends React.Component {
  constructor(props) {
    super(props);
    var height = 10;
    var width = 10;
    var board = this.generateBoard(height, width);
    var boardCapacity = height * width;

    var players = [{color: 'red', name: 'Player 1'}, {color: 'blue', name: 'Player 2'}]
    this.state = {
      board: board,
      players: players,
      activePlayerIndex: 0,
      boardCount: 0, 
      boardCapacity: boardCapacity,
      gameActive: true
    };

    this.onColClick = this.onColClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  generateBoard(height, width) {
    var board = [];
    var boardRow = [];
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        boardRow.push(null);
      }
      board.push(boardRow);
      boardRow = [];
    }
    return board; 
  }

  onColClick(col) {
    
    if (!this.state.gameActive) {
      console.log('Game not in session');
      return;
    }
    var { board, players, activePlayerIndex, boardCount, boardCapacity } = this.state;
    var { name, color } = players[activePlayerIndex];

    console.log(col);
    var row = boardUtils.findSpot(board, col);
    
    if (row < 0) {
      return;
    }
    
    console.log('placed')   

    var newBoard = board.slice();
    newBoard[row][col] = color;
      
    boardCount++;
    
    var winningCells = boardUtils.didWin(row, col, newBoard, color); //Did you remember to use board-utils.js?
    if (winningCells || boardCount === boardCapacity) { 
      var msg = `${name} wins! FATALITY!!!`;
      
      if (!winningCells) {
        msg = 'It\'s a tie!'
      }  
      console.log(msg);
      this.setState({
        gameActive: false,
        displayMsg: msg,
        board: newBoard
      })
      return;
    }
    
    activePlayerIndex = +!activePlayerIndex;
    this.setState({
      activePlayerIndex: activePlayerIndex,
      boardCount: boardCount,
      board: newBoard
    })
  }
  
  resetGame() {
    var { board, activePlayerIndex, gameActive } = this.state;
    var height = board.length;
    var width = board[0].length;
    var newBoard = this.generateBoard(height, width);
    
    if (gameActive) {
      activePlayerIndex = 0;
    }    

    this.setState({
      gameActive: true,
      board: newBoard,
      activePlayerIndex: 0
    });
  }
  
  render() {
    var { board, activePlayerIndex, players, gameActive, displayMsg } = this.state;
    var activePlayerName = players[activePlayerIndex].name;

    var turnMsg = gameActive ? `It is ${activePlayerName}'s turn` : 'Start a new game';
    return (
      <div id="app-container">
        <h1>
          Welcome to Connect Four!
        </h1>
        <div id="board-container">
          <button onClick={this.resetGame}>Reset Game</button>
          <Board board={board} onColClick={this.onColClick}/>
        </div>
        <h1>
          {gameActive ? `It is ${activePlayerName}'s turn` : 'Start a new game'}
        </h1>
        <h1>
          {gameActive ? null : displayMsg}
        </h1>
      </div>
    );
  }
}

window.App = App;