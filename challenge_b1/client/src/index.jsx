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
      pickedChip: null,
      placedChip: true,
      gameActive: true,
    }
    this.handleAction = this.handleAction.bind(this);
    this.pickUpChip = this.pickUpChip.bind(this);
    this.placeChip = this.placeChip.bind(this);
  }

  handleAction(coords) {
    console.log(coords);
    var [ row, col ] = coords;
    var { board, pickedChip, activePlayerIndex, players } = this.state;
    var clickedCell = board[row][col];
    var isSameColor = false;
    if (clickedCell.chip) {
      if (clickedCell.chip.color === players[activePlayerIndex].color) {
         isSameColor = true; 
      }
    }
    if (!pickedChip || isSameColor) {
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
      pickedChip: { row: row, col: col, chip: board[row][col].chip } // Refactor this to just use chip's id instead of whole object
    })
  }
  
  placeChip(coords) {
    var { board, pickedChip, activePlayerIndex, players } = this.state;
    if (!pickedChip) {
      return;
    }
    var boardCopy = JSON.parse(JSON.stringify(board));
    var playersCopy = JSON.parse(JSON.stringify(players));
    var chipCopy = JSON.parse(JSON.stringify(pickedChip));
    var result = BoardUtils.placeChip(chipCopy, coords, boardCopy, activePlayerIndex); // Mutates boardCopy and chipCopy
    if (!result) {
      return;
    }
    if (result.captured) {
      delete playersCopy[+!activePlayerIndex].chips[result.captured.id];
      playersCopy[+!activePlayerIndex].chipCount--;
    }
    console.log('Placed chip');
    var gameActive = true;
    if ( playersCopy[+!activePlayerIndex].chipCount === 0 // Enemy chips are all captured!
      || !BoardUtils.hasMoreMoves(playersCopy[+!activePlayerIndex].chips)) { // Enemy cannot make any more moves
      
    } else {
      activePlayerIndex = +!activePlayerIndex; // Swap to other player
    }

    this.setState({
      board: boardCopy,
      players: playersCopy,
      activePlayerIndex: activePlayerIndex,
      pickedChip: null
    })
  }
  
  render() {
    let { board, players, activePlayerIndex } = this.state;
    let activePlayer = players[activePlayerIndex];
    return (
      <div>
        <Board board={this.state.board} handleAction={this.handleAction}/>
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