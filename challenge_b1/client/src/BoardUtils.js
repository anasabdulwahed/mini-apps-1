var _ = require('lodash');

const BoardUtils = {};

BoardUtils.size = 8;

BoardUtils.initBoard = function() {
  var size = this.size;
  var colors = ['white', 'black'];
  var colorIndex = 0;
  var board = [];
  var boardRow = [];
  var player1Chips = {};
  var player2Chips = {};
  var chipId = 1;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let color = colors[colorIndex];
      boardRow.push({color: color, chip: null});
      if (i < 3 || i > this.size-4) {
        if (color === 'black') {
          let chip = {isKing: false, id: chipId};
          chip.color = i < 3 ? 'blue' : 'red';
          chip.coords = [i, j];
          boardRow[boardRow.length-1].chip = chip;
          if (i < 3) {
            player2Chips[chipId] = chip;
          } else if (i > this.size-4) {
            player1Chips[chipId] = chip;
          }
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

// Will mutate board and chip if chip successfully placed
BoardUtils.placeChip = function(chip, [newRow, newCol], board, invert, isChainJumping) {
  console.log(chip);
  if (!chip) {
    return false;
  }
  var direction = invert ? -1 : 1;
  var end = invert ? 0 : board.length-1;
  var [oldRow, oldCol] = chip.coords;
  var result = { captured: null };
  // if (direction * newRow - row || Math.abs(newCol - col) !== 1) {
  //   return;
  // }
  if (((chip.isKing && Math.abs(newRow - oldRow) === 1) || newRow - oldRow === direction) 
    && Math.abs(newCol - oldCol) === 1) {
    if (isChainJumping) { // To prevent a singular movement while doing chain jumps
      return false;
    }
    if (!this.canMoveOne([newRow, newCol], board)) { // Can't jump if there's a chip in landing spot
      return false;
    }
    chip.coords = [newRow, newCol];
    if (newRow === end) {
      chip.isKing = true;
    }
    board[oldRow][oldCol].chip = null; // Remove player chip from old spot
    board[newRow][newCol].chip = chip; // Place player chip in new spot
    return result;    
  } 
  if (((chip.isKing && Math.abs(newRow - oldRow) === 2) || newRow - oldRow === 2 * direction) 
    && Math.abs(newCol - oldCol) === 2) {
    if (!this.canJump([newRow, newCol], board, chip)) { // Can't jump if there's a chip in landing spot
      return false;
    }
    chip.coords = [newRow, newCol];
    if (newRow === end) {
      if (!chip.isKing) {
        result.stopChainJump = true;
      }
      chip.isKing = true;
    }
    let rowMiddle = (oldRow + newRow) / 2; //get row in mid
    let colMiddle = (oldCol + newCol) / 2; // Get col in mid 
    let capturedChip = board[rowMiddle][colMiddle].chip;
    board[oldRow][oldCol].chip = null; // Remove player chip from old spot
    board[newRow][newCol].chip = chip; // Place player chip in new spot
    board[rowMiddle][colMiddle].chip = null; // Capture enemy chip
    result.captured = capturedChip;
    return result;
  }
  return false;
};

BoardUtils.hasMoreMoves = function(chips, board, invert) {
  var ids = Object.keys(chips);
  var hasMoreMoves = false;
  _.forEach(ids, (id) => {
    if (this.canMoveChip(chips[id], board, invert, 1) || this.canMoveChip(chips[id], board, invert, 2)) {
      hasMoreMoves = true;
      return false; // Break out of loop
    }
  });
  return hasMoreMoves;
}

BoardUtils.canMoveChip = function(chip, board, invert, range) { // range === 1: look for single moves, range === 2: look for jumps
  var [row, col] = chip.coords;
  var spots = [];
  var direction = invert ? -1 * range : range;
  var canPlace = range === 1 ? this.canMoveOne.bind(this) : this.canJump.bind(this);
  var canMoveChip = false;
  spots.push([row+direction, col+range]);
  spots.push([row+direction, col-range]);
  if (chip.isKing) { // If is king, then investigate other two diagonal spots
    spots.push([row-direction, col+range]);
    spots.push([row-direction, col-range]);
  }
  _.forEach(spots, (spot) => {
    if (canPlace(spot, board, chip)) {
      canMoveChip = true;
      return false;
    }
  });
  return canMoveChip;
}

BoardUtils.canMoveOne = function([newRow, newCol], board) {
  if (newRow > this.size-1 || newRow < 0 
    || newCol > this.size-1 || newCol < 0) {
    return false;
  }
  if (board[newRow][newCol].chip) {
    return false;
  }
  return true;
}

BoardUtils.canJump = function( [newRow, newCol], board, chip) {
  if (newRow > this.size-1 || newRow < 0 
    || newCol > this.size-1 || newCol < 0) {
    return false;
  }
  var [oldRow, oldCol] = chip.coords;
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