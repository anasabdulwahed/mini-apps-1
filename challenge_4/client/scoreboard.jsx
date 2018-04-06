var ScoreBoard = (props) => {
  var { frames, frameCounter } = props;
  
  var header = []
  for (let i = 0; i < frames.length; i++) {
    header.push(<div key={i} className="head-frame">{i+1}</div>);
  }

  return (
    <div id="score-board">
      {header}
      {frames.map((frame, index) => 
        <ScoreFrame key={index} frame={frame}/>
      )}
    </div>  
  )
}