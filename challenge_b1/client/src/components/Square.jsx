import React from 'react';

const Square = ({coords, cell, onClick, activeColor, pickedChipId, onImageLoad}) => {
  const { color, chip } = cell; 
  return (
    <div 
      className={`${pickedChipId && !chip ? 'turn-active' : ''}`} 
      style={{ height: '50px', backgroundColor: color }} 
      onClick={() => {onClick(coords);}}
    >
      {chip ? 
      <img 
        className={`chip ${chip.color === activeColor ? 'active': ''} ${chip.id === pickedChipId ? 'selected' : ''}`} 
        src={`img/${chip.color}_${chip.isKing ? 'king' : 'basic'}.png`}
        onLoad={onImageLoad}
      >
      </img>
      : null}
    </div>
  )
};

export default Square;

/* <div className={`chip ${chip.color}${chip.isKing ? '-king' : ''}`}>
</div> */