var ScoreFrame = (props) => {
  var { frame } = props;
  var { turns, subTotal, hideScore } = frame;

  var turnFrameWidth = 91/(turns.length);

  var turnsFormat = {
    display: 'grid',
    gridTemplateColumns: `repeat(${turns.length}, ${turnFrameWidth}px)`,
  }

  return (
    <div className="score-frame">
      <div className="turns-section" style={turnsFormat}>
        {turns.map(score => 
          <div className="turn" style={{width: `${turnFrameWidth}px`}}>
            {score}
          </div>
        )}
      </div>
      <div className="sub-total">{hideScore ? null : subTotal}</div>
    </div>
  );
}