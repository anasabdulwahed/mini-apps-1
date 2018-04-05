'use strict';

var Board = function Board(props) {
  var board = props.board,
      onColClick = props.onColClick;


  var height = board.length;
  var width = board[0].length;

  var setColumns = function setColumns() {
    var columnString = '';
    for (var i = 0; i < width; i++) {
      columnString += 'auto ';
    }
    return columnString.trim();
  };

  var cellStyle = {
    textAlign: 'center',
    height: '50px',
    width: '50px',
    border: '1px solid black'
  };

  var boardStyle = {
    display: 'grid',
    height: height * 52 + 'px',
    width: width * 52 + 'px',
    gridTemplateColumns: setColumns(),
    border: '1px solid black',
    margin: 'auto'
  };

  var inputSectionStyle = {
    display: 'grid',
    width: width * 52 + 'px',
    gridTemplateColumns: setColumns(),
    margin: 'auto'
  };

  var inputStyle = {
    height: '52px',
    width: '52px'
  };

  var inputSection = [];
  for (var i = 0; i < width; i++) {
    inputSection.push(i);
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { style: inputSectionStyle },
      inputSection.map(function (colNum) {
        return React.createElement('div', { key: colNum, onClick: function onClick() {
            onColClick(colNum);
          }, className: 'input', style: inputStyle });
      })
    ),
    React.createElement(
      'div',
      { style: boardStyle },
      board.map(function (row, rowNum) {
        return row.map(function (color, colNum) {
          return React.createElement(Cell, { key: '' + rowNum + colNum, coordinates: [rowNum, colNum], style: cellStyle, color: color });
        });
      })
    )
  );
};

window.Board = Board;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9ib2FyZC5qc3giXSwibmFtZXMiOlsiQm9hcmQiLCJwcm9wcyIsImJvYXJkIiwib25Db2xDbGljayIsImhlaWdodCIsImxlbmd0aCIsIndpZHRoIiwic2V0Q29sdW1ucyIsImNvbHVtblN0cmluZyIsImkiLCJ0cmltIiwiY2VsbFN0eWxlIiwidGV4dEFsaWduIiwiYm9yZGVyIiwiYm9hcmRTdHlsZSIsImRpc3BsYXkiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwibWFyZ2luIiwiaW5wdXRTZWN0aW9uU3R5bGUiLCJpbnB1dFN0eWxlIiwiaW5wdXRTZWN0aW9uIiwicHVzaCIsIm1hcCIsImNvbE51bSIsInJvdyIsInJvd051bSIsImNvbG9yIiwid2luZG93Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxLQUFELEVBQVc7QUFBQSxNQUNmQyxLQURlLEdBQ09ELEtBRFAsQ0FDZkMsS0FEZTtBQUFBLE1BQ1JDLFVBRFEsR0FDT0YsS0FEUCxDQUNSRSxVQURROzs7QUFHckIsTUFBSUMsU0FBU0YsTUFBTUcsTUFBbkI7QUFDQSxNQUFJQyxRQUFRSixNQUFNLENBQU4sRUFBU0csTUFBckI7O0FBRUEsTUFBSUUsYUFBYSxTQUFiQSxVQUFhLEdBQU07QUFDckIsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxLQUFwQixFQUEyQkcsR0FBM0IsRUFBZ0M7QUFDOUJELHNCQUFnQixPQUFoQjtBQUNEO0FBQ0QsV0FBT0EsYUFBYUUsSUFBYixFQUFQO0FBQ0QsR0FORDs7QUFRQSxNQUFJQyxZQUFZO0FBQ2RDLGVBQVcsUUFERztBQUVkUixZQUFRLE1BRk07QUFHZEUsV0FBTyxNQUhPO0FBSWRPLFlBQVE7QUFKTSxHQUFoQjs7QUFPQSxNQUFJQyxhQUFhO0FBQ2ZDLGFBQVMsTUFETTtBQUVmWCxZQUFXQSxTQUFTLEVBQXBCLE9BRmU7QUFHZkUsV0FBVUEsUUFBUSxFQUFsQixPQUhlO0FBSWZVLHlCQUFxQlQsWUFKTjtBQUtmTSxZQUFRLGlCQUxPO0FBTWZJLFlBQVE7QUFOTyxHQUFqQjs7QUFTQSxNQUFJQyxvQkFBb0I7QUFDdEJILGFBQVMsTUFEYTtBQUV0QlQsV0FBVUEsUUFBUSxFQUFsQixPQUZzQjtBQUd0QlUseUJBQXFCVCxZQUhDO0FBSXRCVSxZQUFRO0FBSmMsR0FBeEI7O0FBT0EsTUFBSUUsYUFBYTtBQUNmZixZQUFRLE1BRE87QUFFZkUsV0FBTztBQUZRLEdBQWpCOztBQUtBLE1BQUljLGVBQWUsRUFBbkI7QUFDQSxPQUFLLElBQUlYLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsS0FBcEIsRUFBMkJHLEdBQTNCLEVBQWdDO0FBQzlCVyxpQkFBYUMsSUFBYixDQUFrQlosQ0FBbEI7QUFDRDs7QUFFRCxTQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxRQUFLLE9BQU9TLGlCQUFaO0FBQ0dFLG1CQUFhRSxHQUFiLENBQWlCLFVBQUNDLE1BQUQ7QUFBQSxlQUNoQiw2QkFBSyxLQUFLQSxNQUFWLEVBQWtCLFNBQVMsbUJBQU07QUFBQ3BCLHVCQUFXb0IsTUFBWDtBQUFtQixXQUFyRCxFQUF1RCxXQUFVLE9BQWpFLEVBQXlFLE9BQU9KLFVBQWhGLEdBRGdCO0FBQUEsT0FBakI7QUFESCxLQURGO0FBS0U7QUFBQTtBQUFBLFFBQUssT0FBT0wsVUFBWjtBQUNHWixZQUFNb0IsR0FBTixDQUFVLFVBQUNFLEdBQUQsRUFBTUMsTUFBTjtBQUFBLGVBQ1RELElBQUlGLEdBQUosQ0FBUSxVQUFDSSxLQUFELEVBQVFILE1BQVI7QUFBQSxpQkFDTixvQkFBQyxJQUFELElBQU0sVUFBUUUsTUFBUixHQUFpQkYsTUFBdkIsRUFBaUMsYUFBYSxDQUFDRSxNQUFELEVBQVNGLE1BQVQsQ0FBOUMsRUFBZ0UsT0FBT1osU0FBdkUsRUFBa0YsT0FBT2UsS0FBekYsR0FETTtBQUFBLFNBQVIsQ0FEUztBQUFBLE9BQVY7QUFESDtBQUxGLEdBREY7QUFlRCxDQTlERDs7QUFnRUFDLE9BQU8zQixLQUFQLEdBQWVBLEtBQWYiLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQm9hcmQgPSAocHJvcHMpID0+IHtcbiAgdmFyIHsgYm9hcmQsIG9uQ29sQ2xpY2sgfSA9IHByb3BzO1xuICBcbiAgdmFyIGhlaWdodCA9IGJvYXJkLmxlbmd0aDtcbiAgdmFyIHdpZHRoID0gYm9hcmRbMF0ubGVuZ3RoO1xuXG4gIHZhciBzZXRDb2x1bW5zID0gKCkgPT4ge1xuICAgIHZhciBjb2x1bW5TdHJpbmcgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgIGNvbHVtblN0cmluZyArPSAnYXV0byAnO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uU3RyaW5nLnRyaW0oKTtcbiAgfVxuICBcbiAgdmFyIGNlbGxTdHlsZSA9IHtcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgIGhlaWdodDogJzUwcHgnLFxuICAgIHdpZHRoOiAnNTBweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgfTtcbiAgXG4gIHZhciBib2FyZFN0eWxlID0ge1xuICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICBoZWlnaHQ6IGAke2hlaWdodCAqIDUyfXB4YCxcbiAgICB3aWR0aDogYCR7d2lkdGggKiA1Mn1weGAsXG4gICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogc2V0Q29sdW1ucygpLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgbWFyZ2luOiAnYXV0bydcbiAgfTtcblxuICB2YXIgaW5wdXRTZWN0aW9uU3R5bGUgPSB7XG4gICAgZGlzcGxheTogJ2dyaWQnLFxuICAgIHdpZHRoOiBgJHt3aWR0aCAqIDUyfXB4YCxcbiAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiBzZXRDb2x1bW5zKCksXG4gICAgbWFyZ2luOiAnYXV0bydcbiAgfVxuICBcbiAgdmFyIGlucHV0U3R5bGUgPSB7XG4gICAgaGVpZ2h0OiAnNTJweCcsXG4gICAgd2lkdGg6ICc1MnB4JyxcbiAgfTtcbiAgXG4gIHZhciBpbnB1dFNlY3Rpb24gPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgaW5wdXRTZWN0aW9uLnB1c2goaSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2IHN0eWxlPXtpbnB1dFNlY3Rpb25TdHlsZX0+XG4gICAgICAgIHtpbnB1dFNlY3Rpb24ubWFwKChjb2xOdW0pID0+IFxuICAgICAgICAgIDxkaXYga2V5PXtjb2xOdW19IG9uQ2xpY2s9eygpID0+IHtvbkNvbENsaWNrKGNvbE51bSl9fSBjbGFzc05hbWU9XCJpbnB1dFwiIHN0eWxlPXtpbnB1dFN0eWxlfT48L2Rpdj4pfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXtib2FyZFN0eWxlfT5cbiAgICAgICAge2JvYXJkLm1hcCgocm93LCByb3dOdW0pID0+IFxuICAgICAgICAgIHJvdy5tYXAoKGNvbG9yLCBjb2xOdW0pID0+IFxuICAgICAgICAgICAgPENlbGwga2V5PXtgJHtyb3dOdW19JHtjb2xOdW19YH0gY29vcmRpbmF0ZXM9e1tyb3dOdW0sIGNvbE51bV19IHN0eWxlPXtjZWxsU3R5bGV9IGNvbG9yPXtjb2xvcn0vPlxuICAgICAgICAgICkgXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbndpbmRvdy5Cb2FyZCA9IEJvYXJkOyJdfQ==