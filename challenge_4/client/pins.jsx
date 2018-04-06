var Pins = (props) => {
  var { pinsLeft, onClick } = props;
  var pins = []
  for (let i = 0; i <= pinsLeft; i++) {
    pins.push(
      <div key={i} onClick={() => {onClick(i);}} className="pins">{i}</div>
    )
  }
  return (
    <div id="pins-grid">
      {pins}
    </div>
  );
}