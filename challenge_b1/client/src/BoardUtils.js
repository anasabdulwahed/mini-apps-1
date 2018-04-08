const BoardUtils = {};

BoardUtils.size = 8;

BoardUtils.initBoard = function() {
  var size = this.size;
  var colors = ['black', 'white'];
  var colorIndex = 0;
  var board = [];
  var boardRow = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let color = colors[colorIndex];
      boardRow.push({color: color, chip: null});
      if (i < 3 || i > 4) {
        if (color === 'black') {
          let chip = {isKing: false};
          chip.color = i < 3 ? 'red' : 'blue';
          boardRow[boardRow.length-1].chip = chip;
        }
      }
      colorIndex = +!colorIndex;
    }
    colorIndex = +!colorIndex;
    board.push(boardRow);
    boardRow = [];
  }
  return board; 
}

// Will mutate board if chip successfully placed
BoardUtils.placeChip = function(chipToPlace, [newRow, newCol], board, invert) {
  console.log(chipToPlace);
  if (!chipToPlace) {
    return false;
  }
  var direction = invert ? -1 : 1;
  var end = invert ? 0 : board.length-1;
  var { row: oldRow, col: oldCol, chip } = chipToPlace;
  var result = { captured: false };
  // if (direction * newRow - row || Math.abs(newCol - col) !== 1) {
  //   return;
  // }
  if (newRow - oldRow === direction && Math.abs(newCol - oldCol) === 1) {
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
  if (newRow - oldRow === 2 * direction && Math.abs(newCol - oldCol) === 2) {
    var rowMiddle = oldRow + direction;
    var colMiddle = (oldCol + newCol) / 2; // Get col in mid point
    if (board[rowMiddle][colMiddle].chip.color === chip.color // Can't jump over own chip
      || !board[rowMiddle][colMiddle].chip // Can't jump if there is no chip to jump over
      || board[newRow][newCol].chip) { // Can't jump if there's a chip in landing spot
      return false;
    }
    if (newRow === end) {
      chip.isKing = true;
    }
    board[oldRow][oldCol].chip = null; // Remove player chip from old spot
    board[newRow][newCol].chip = chip; // Place player chip in new spot
    board[rowMiddle][colMiddle].chip = null; // Capture enemy chip
    result.captured = true;
    return result;
  }
  return false;
};


export default BoardUtils;