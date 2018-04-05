var Cell = (props) => {
  var { coordinates, onCellClick, color, style } = props;
  
  return ( 
    <div style={_.extend({backgroundColor: color}, style)}>
    </div>
  );
}

window.Cell = Cell;