import React from 'react';
import Square from './Square.jsx';

const Board = ({board, handleAction, activeColor, pickedChipId}) => {
  const boardStyle = { 
    display: 'grid', 
    width: `${board.length * 50}px`,
    gridTemplateColumns: `repeat(${board.length}, 50px)`,
    backgroundColor: 'white',
    borderColor: 'black brown brown black',
    borderStyle: 'solid',
    borderWidth: '6px 4px 4px 6px',
    margin: 'auto',
    marginTop: '40px',
  }
  
  return (
    <div style={boardStyle}>
      {board.map((row, rowNum) =>
        row.map((cell, colNum) =>
          <Square 
            coords={[rowNum, colNum]} 
            cell={cell} 
            activeColor={activeColor} 
            pickedChipId = {pickedChipId}
            onClick={handleAction}
          />
        )
      )}
    </div>
  )
};

export default Board;