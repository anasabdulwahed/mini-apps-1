import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';
import BoardUtils from './BoardUtils.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    let  { board, player1Chips, player2Chips } = BoardUtils.initBoard();
    this.state = {
      board: board,
      players: [
        {name: 'Player 1', color: 'red', chipCount: 12, chips: player1Chips}, 
        {name: 'Player 2', color: 'blue', chipCount: 12, chips: player2Chips}
      ],
      activePlayerIndex: 0,
      pickedChipId: null,   
      placedChip: true,
      gameActive: true,
      winner: null,
      tie: false, 
    }
    this.handleAction = this.handleAction.bind(this);
    this.pickUpChip = this.pickUpChip.bind(this);
    this.placeChip = this.placeChip.bind(this);
  }

  handleAction(coords) {
    console.log(coords);
    var [ row, col ] = coords;
    var { board, pickedChipId, activePlayerIndex, players } = this.state;
    var clickedCell = board[row][col];
    var isSameColor = false;
    if (clickedCell.chip) {
      if (clickedCell.chip.color === players[activePlayerIndex].color) {
         isSameColor = true; 
      }
    }
    if (!pickedChipId || isSameColor) {
      this.pickUpChip(coords);
    } else {
      this.placeChip(coords);
    }
  }

  pickUpChip([ row, col ]) {
    var { board, activePlayerIndex, players } = this.state;
    if (!board[row][col].chip) {
      return;
    }
    if (board[row][col].chip.color !== players[activePlayerIndex].color) {
      return;
    }
    console.log('Picked up chip');
    this.setState({
      pickedChipId: board[row][col].chip.id // Refactor this to just use chip's id instead of whole object
    })
  }
  
  placeChip(coords) {
    var { board, pickedChipId, activePlayerIndex, players, chainJump } = this.state;
    if (!pickedChipId) {
      return;
    }
    var boardCopy = JSON.parse(JSON.stringify(board));
    var playersCopy = JSON.parse(JSON.stringify(players));
    var player = playersCopy[activePlayerIndex];
    var enemy = playersCopy[+!activePlayerIndex];
    var chipCopy = player.chips[pickedChipId];
    var result = BoardUtils.placeChip(chipCopy, coords, boardCopy, activePlayerIndex, chainJump); // Mutates boardCopy and chipCopy
    if (!result) {
      return;
    }
    if (result.captured) {
      delete enemy.chips[result.captured.id];
      enemy.chipCount--;
    }
    console.log('Placed chip');
    var gameActive = true;
    var playerHasMoreMoves = BoardUtils.hasMoreMoves(player.chips, boardCopy, activePlayerIndex);
    var enemyHasMoreMoves = BoardUtils.hasMoreMoves(enemy.chips, boardCopy, +!activePlayerIndex);
    var winner = null;
    var tie = false;
    var chainJump = false;
    if (!enemyHasMoreMoves || !playerHasMoreMoves) { 
      gameActive = false;
      if (enemyHasMoreMoves) {
        winner = enemy.name; 
      } else if (playerHasMoreMoves) {
        winner = player.name;
      } else {
        if (player.chipCount > enemy.chipCount) {
          winner = player.name;
        } else if (player.chipCount < enemy.chipCount) {
          winner = enemy.name;
        } else {
          tie = true;
        }
      }
      pickedChipId = null;
    } else if (BoardUtils.hasMoves(chipCopy, boardCopy, activePlayerIndex, 2) && result.captured) { // Can chain jumps
      chainJump = true;
    } else {  
      activePlayerIndex = +!activePlayerIndex; // Swap to other player
      pickedChipId = null;
    } 

    this.setState({
      board: boardCopy,
      players: playersCopy,
      activePlayerIndex: activePlayerIndex,
      pickedChipId: pickedChipId,
      gameActive: gameActive,
      winner: winner,
      tie: tie,
      chainJump: chainJump
    })
  }

  createResultMsg(gameActive, winner, tie) {
    if (gameActive) {
      return '';
    }
    if (winner) {
      return `${winner} wins!!`;
    }
    if (tie) {
      return `It's a draw!`;
    }
  }
  
  render() {
    let { board, players, activePlayerIndex, gameActive, winner, tie } = this.state;
    let activePlayer = players[activePlayerIndex];
    let resultMsg = this.createResultMsg(gameActive, winner, tie);
    return (
      <div>
        <Board board={this.state.board} handleAction={this.handleAction}/>
        <div>
          <h2>{resultMsg}</h2>
        </div>
        <h4>{`It is ${activePlayer.name}'s turn (${activePlayer.color})`}</h4>
        <div>
          <p>{`${players[0].name}: ${players[0].chipCount} chips remaining`}</p>
          <p>{`${players[1].name}: ${players[1].chipCount} chips remaining`}</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);