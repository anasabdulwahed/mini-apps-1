import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';
import BoardUtils from './BoardUtils.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    let  { board, player1Chips, player2Chips } = BoardUtils.initBoard();
    let player1ChipCount = Object.keys(player1Chips).length;
    let player2ChipCount = Object.keys(player2Chips).length;
    this.state = {
      board: board,
      players: [
        {name: 'Player 2', color: 'blue', chipCount: player2ChipCount, chips: player2Chips}, 
        {name: 'Player 1', color: 'red', chipCount: player1ChipCount, chips: player1Chips}
      ],
      activePlayerIndex: 0,
      pickedChipId: null,   
      placedChip: true,
      gameActive: true,
      winner: {},
      tie: false, 
    }
    this.handleAction = this.handleAction.bind(this);
    this.pickUpChip = this.pickUpChip.bind(this);
    this.placeChip = this.placeChip.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  handleAction(coords) {
    console.log(coords);
    var [ row, col ] = coords;
    var { board, pickedChipId, activePlayerIndex, players, isChainJumping } = this.state;
    var clickedCell = board[row][col];
    var isSameColor = false;
    if (clickedCell.chip) {
      if (clickedCell.chip.color === players[activePlayerIndex].color) {
         isSameColor = true; 
      }
    }
    if ((!pickedChipId || isSameColor) && !isChainJumping) {
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
    var { board, pickedChipId, activePlayerIndex, players, isChainJumping } = this.state;
    if (!pickedChipId) {
      return;
    }
    var boardCopy = JSON.parse(JSON.stringify(board));
    var playersCopy = JSON.parse(JSON.stringify(players));
    var player = playersCopy[activePlayerIndex];
    var enemy = playersCopy[+!activePlayerIndex];
    var chipCopy = player.chips[pickedChipId];
    var result = BoardUtils.placeChip(chipCopy, coords, boardCopy, activePlayerIndex, isChainJumping); // Mutates boardCopy and chipCopy
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
    var winner = {};
    var tie = false;
    var isChainJumping = false;
    if (!enemyHasMoreMoves || !playerHasMoreMoves) { 
      gameActive = false;
      if (enemy.chipCount === 0) { // Can be a cause for enemy having no more moves
        winner.name = player.name;
        winner.reason =  `${enemy.name}'s chips have all been captured!`;
      } else if (enemyHasMoreMoves) {
        winner.name = enemy.name; 
        winner.reason = `${player.name} has ran out of valid moves!`;
      } else if (playerHasMoreMoves) {
        winner.name = player.name;
        winner.reason = `${enemy.name} has ran out of valid moves!`;
      } else {
        if (player.chipCount > enemy.chipCount) {
          winner.name = player.name;
          winner.reason = `${player.name} has more surviving chips!`;
        } else if (player.chipCount < enemy.chipCount) {
          winner.name = enemy.name;
          winner.reason = `${enemy.name} has more surviving chips!`;
        } else {
          tie = true;
        }
      }
      pickedChipId = null;
    } else if (BoardUtils.canMoveChip(chipCopy, boardCopy, activePlayerIndex, 2) && result.captured && !result.stopChainJump) { // Can chain jumps
      isChainJumping = true;
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
      isChainJumping: isChainJumping
    })
  }

  createResultMsg(gameActive, winner, tie) {
    if (gameActive) {
      return '';
    }
    if (winner) {
      return <div><h2>{`${winner.name} wins!!`}</h2><h4>{`${winner.reason}`}</h4></div>;
    }
    if (tie) {
      return <h2>{`Golly, it's a draw!`}</h2>;
    }
  }

  resetGame() {
    let  { board, player1Chips, player2Chips } = BoardUtils.initBoard();
    let player1ChipCount = Object.keys(player1Chips).length;
    let player2ChipCount = Object.keys(player2Chips).length;
    let activePlayerIndex;
    this.state.gameActive ? activePlayerIndex = 1 : activePlayerIndex = this.state.activePlayerIndex;

    this.setState({
      board: board,
      players: [ 
        {name: 'Player 2', color: 'blue', chipCount: player2ChipCount, chips: player2Chips},
        {name: 'Player 1', color: 'red', chipCount: player1ChipCount, chips: player1Chips}
      ],  
      pickedChipId: null,  
      activePlayerIndex: activePlayerIndex,
      placedChip: true,
      gameActive: true,
      winner: {},
      tie: false, 
    });
  }
  
  render() {
    let { board, players, activePlayerIndex, gameActive, winner, tie } = this.state;
    let activePlayer = players[activePlayerIndex];
    let resultMsg = this.createResultMsg(gameActive, winner, tie);
    return (
      <div>
        <Board board={this.state.board} handleAction={this.handleAction}/>
        <div style={{ margin: 'auto', width: '500px', textAlign: 'center'}}>
          <div>{resultMsg}</div>
          <h4>{gameActive ? `It is ${activePlayer.name}'s turn (${activePlayer.color})` : null}</h4>
          <div>
            <p>{`${players[1].name} (${players[1].color}): ${players[1].chipCount} chips remaining`}</p>
            <p>{`${players[0].name} (${players[0].color}): ${players[0].chipCount} chips remaining`}</p>
          </div>
          <button onClick={this.resetGame}>Reset Game</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);