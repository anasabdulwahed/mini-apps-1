import React from 'react';

const Square = ({coords, cell, onClick}) => {
  const { color, chip } = cell;
  return (
    <div style={{ height: '50px', backgroundColor: color }} onClick={() => onClick(coords)}>
      {chip ? <div className="chip" style={{ 
        backgroundColor: chip.color, 
        border: chip.isKing ? '5px solid yellow' : null }}
      >
      </div> : null}
    </div>
  )
};

export default Square;