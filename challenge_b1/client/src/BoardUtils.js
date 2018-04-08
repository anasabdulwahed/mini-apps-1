var _ = require('lodash');

const BoardUtils = {};

BoardUtils.size = 8;

BoardUtils.initBoard = function() {
  var size = this.size;
  var colors = ['black', 'white'];
  var colorIndex = 0;
  var board = [];
  var boardRow = [];
  var player1Chips = {};
  var player2Chips = {};
  var chipId = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let color = colors[colorIndex];
      boardRow.push({color: color, chip: null});
      if (i < 3 || i > 4) {
        if (color === 'black') {
          let chip = {isKing: false, id: chipId};
          chip.color = i < 3 ? 'red' : 'blue';
          chip.coords = [i, j];
          boardRow[boardRow.length-1].chip = chip;
          i < 3 ? player1Chips[chipId] = chip : player2Chips[chipId] = chip;
          chipId++;
        }
      }
      colorIndex = +!colorIndex;
    }
    colorIndex = +!colorIndex;
    board.push(boardRow);
    boardRow = [];
  }
  return { board: board, player1Chips: player1Chips, player2Chips: player2Chips }; 
}

// Will mutate board if chip successfully placed
BoardUtils.placeChip = function(chipToPlace, [newRow, newCol], board, playerChips, invert) {
  console.log(chipToPlace);
  if (!chipToPlace) {
    return false;
  }
  var direction = invert ? -1 : 1;
  var end = invert ? 0 : board.length-1;
  var { row: oldRow, col: oldCol, chip } = chipToPlace;
  var result = { captured: null };
  // if (direction * newRow - row || Math.abs(newCol - col) !== 1) {
  //   return;
  // }
  if (((chip.isKing && Math.abs(newRow - oldRow) === 1) || newRow - oldRow === direction) 
    && Math.abs(newCol - oldCol) === 1) {
    if (board[newRow][newCol].chip) { // Can't jump if there's a chip in landing spot
      return false;
    }
    if (newRow === end) {
      chip.isKing = true;
    }
    board[oldRow][oldCol].chip = null; // Remove player chip from old spot
    board[newRow][newCol].chip = chip; // Place player chip in new spot
    return result;    
  } 
  if (((chip.isKing && Math.abs(newRow - oldRow) === 2) || newRow - oldRow === 2 * direction) 
    && Math.abs(newCol - oldCol) === 2) {
    var rowMiddle = (oldRow + newRow) / 2; //get row in mid
    var colMiddle = (oldCol + newCol) / 2; // Get col in mid 
    if (!this.canJump([oldRow, oldCol], [newRow, newCol], chip, board)) { // Can't jump if there's a chip in landing spot
      return false;
    }
    if (newRow === end) {
      chip.isKing = true;
    }
    let capturedChip = board[rowMiddle][colMiddle].chip;
    board[oldRow][oldCol].chip = null; // Remove player chip from old spot
    board[newRow][newCol].chip = chip; // Place player chip in new spot
    board[rowMiddle][colMiddle].chip = null; // Capture enemy chip
    result.captured = capturedChip;
    return result;
  }
  return false;
};

BoardUtils.hasMoreMoves = function(chips, board) {
  var ids = Object.keys(chips);
  var hasMoreMoves = false;
  _.forEach(ids, (id) => {
    if (this.hasSingleMoves(chips[id], board) || this.hasJumps(chips[id], board)) {
      hasMoreMoves = true;
      return false; // Break out of loop
    }
  });
  return hasMoreMoves;
}

BoardUtils.hasSingleMoves = function(chip, board) {
  var [row, col] = 
}

BoardUtils.canJump = function([oldRow, oldCol], [newRow, newCol], chip, board) {
  var rowMiddle = (oldRow + newRow) / 2; //get row in mid
  var colMiddle = (oldCol + newCol) / 2; // Get col in mid
  var isSameColor = false;
  if (board[rowMiddle][colMiddle].chip) {
    if (board[rowMiddle][colMiddle].chip.color === chip.color) {
      isSameColor = true;
    }
  }
  if (isSameColor // Can't jump over own chip
    || !board[rowMiddle][colMiddle].chip // Can't jump if there is no chip to jump over
    || board[newRow][newCol].chip) { // Can't jump if there's a chip in landing spot
    return false;
  }
  return true;
}

module.exports = BoardUtils;