import React from 'react';
import Square from './Square.jsx';

const Board = ({board, handleAction, activeColor, pickedChipId}) => {
  const boardStyle = { 
    display: 'grid', 
    width: `${board.length * 50}px`,
    gridTemplateColumns: `repeat(${board.length}, 50px)`,
    border: '1px solid black',
    margin: 'auto',
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