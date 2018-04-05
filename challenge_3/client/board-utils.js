var boardUtils = {};

boardUtils.findSpot = function(board, col) {
  for (var i = -1; i < board.length-1; i++) {
    if (board[i+1][col]) {
      return i;
    }
  }
  return i;
}

boardUtils.didWin = function(row, col, board, color) {
  return this.winInRow(row, board, color) 
  || this.winInCol(col, board, color) 
  || this.winInDiagonals(row, col, board, color)
}

boardUtils.winInRow = function(row, board, color) {
  var counter = 0;
  var width = board[0].length;
  for (var col = 0; col < width; col++) {
    if (board[row][col] === color) {
      counter++;
      if (counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
  }
  return false;
}

boardUtils.winInCol = function(col, board, color) {
  var counter = 0;
  var height = board.length;
  for (var row = 0; row < height; row++) {
    if (board[row][col] === color) {
      counter++;
      if (counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
    console.log(counter)
  }
  return false;
}

boardUtils.winInDiagonals = function(row, col, board, color) {
  var startColMajor = col - row; 
  var startColMinor = col + row;
  return this.winInMajorDiagonal(startColMajor, board, color) 
  || this.winInMinorDiagonal(startColMinor, board, color);
}

boardUtils.winInMajorDiagonal = function(startCol, board, color) {
  var width = board[0].length;
  var height = board.length;

  var row = 0;
  var col = startCol;
  var counter = 0;
  while (row < height && col < width) {
    if (board[row][col] === color) {
      counter++
      if (counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
    row++;
    col++;
  }
}

boardUtils.winInMinorDiagonal = function(startCol, board, color) {
  var width = board[0].length;
  var height = board.length;

  var row = 0;
  var col = startCol;
  var counter = 0;
  while (row < height && col >= 0) {
    if (board[row][col] === color) {
      counter++
      if (counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
    row++;
    col--;
  }
}

window.boardUtils = boardUtils;