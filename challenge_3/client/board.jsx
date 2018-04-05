var Board = (props) => {
  var { board, onColClick } = props;
  
  var height = board.length;
  var width = board[0].length;

  var setColumns = () => {
    var columnString = '';
    for (var i = 0; i < width; i++) {
      columnString += 'auto ';
    }
    return columnString.trim();
  }
  
  var cellStyle = {
    textAlign: 'center',
    height: '50px',
    width: '50px',
    border: '1px solid black',
  };
  
  var boardStyle = {
    display: 'grid',
    height: `${height * 52}px`,
    width: `${width * 52}px`,
    gridTemplateColumns: setColumns(),
    border: '1px solid black',
    margin: 'auto'
  };

  var inputSectionStyle = {
    display: 'grid',
    width: `${width * 52}px`,
    gridTemplateColumns: setColumns(),
    margin: 'auto'
  }
  
  var inputStyle = {
    height: '52px',
    width: '52px',
  };
  
  var inputSection = [];
  for (var i = 0; i < width; i++) {
    inputSection.push(i);
  }

  return (
    <div>
      <div style={inputSectionStyle}>
        {inputSection.map((colNum) => 
          <div key={colNum} onClick={() => {onColClick(colNum)}} className="input" style={inputStyle}></div>)}
      </div>
      <div style={boardStyle}>
        {board.map((row, rowNum) => 
          row.map((color, colNum) => 
            <Cell key={`${rowNum}${colNum}`} coordinates={[rowNum, colNum]} style={cellStyle} color={color}/>
          ) 
        )}
      </div>
    </div>
  );
};

window.Board = Board;