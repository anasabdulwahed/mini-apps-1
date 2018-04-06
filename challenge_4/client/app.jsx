class App extends React.Component {
  constructor(props) {
    super(props);
    frames = this.resetFrames();
    console.dir(frames);
    this.state = {
      frames: frames,
      curScore: 0,
      maxPins: 10,
      pinsLeft: 10,
      frameCounter: 0,
      turn: 0,
      shotHistory: [], 
    }
    this.onPinClick = this.onPinClick.bind(this);
  }

  resetFrames() {
    var frames = [];
    for (var i = 0; i < 10; i++) {
      frames.push({
        'turns': [null, null],
        'subTotal': 0, 
        'didStrike': false,
        'didSpare': false,
        'hideScore': true, 
      });
      if (i === 9) {
        frames[i]['turns'].push(null);
      }
    }
    return frames;
  }

  onPinClick(amount) {
    var { 
      pinsLeft, 
      turn, 
      maxPins, 
      frameCounter, 
      frames, 
      curScore,
      prevScore,
      shotHistory,
    } = this.state;

    var framesCopy = JSON.parse(JSON.stringify(frames)); // Deep copy of frames       

    pinsLeft -= amount;
    curScore += amount;

    var curFrame = framesCopy[frameCounter];
    curFrame.turns[turn] = amount;
    curFrame.hideScore = false;

    if (frameCounter > 0) {
      var oneShotAgo = shotHistory[shotHistory.length-1];
      var twoShotsAgo = shotHistory[shotHistory.length-2];
      var frameOneShotAgo = framesCopy[oneShotAgo.frameIndex];
      
      if (twoShotsAgo) {
        var frameTwoShotsAgo = framesCopy[twoShotsAgo.frameIndex];
        if (frameTwoShotsAgo.didStrike) {
          frameTwoShotsAgo.subTotal += amount;
          frameTwoShotsAgo.hideScore = false;
          curScore += amount;
        }
      }
      
      if (frameOneShotAgo.didStrike) {
        curFrame.hideScore = true;
        var amountToAdd = amount;
        if (twoShotsAgo) {
          amountToAdd = 2 * amount;
        }
        frameOneShotAgo.subTotal += amountToAdd;
        curScore += amount;
      } 
      
      if (frameOneShotAgo.didSpare && turn === 0) {
        frameOneShotAgo.subTotal += amount;
        frameOneShotAgo.hideScore = false;
        curScore += amount;
      } 
    } 

    if (turn === 0 && pinsLeft === 0) {
      curFrame.didStrike = true;
      curFrame.hideScore = true;
    } else if (turn === 1 && pinsLeft === 0) {
      curFrame.didSpare = true;
      curFrame.hideScore = true; 
    } 
    
    curFrame.subTotal = curScore;
  
    var updatedShotHistory = JSON.parse(JSON.stringify(shotHistory)); // Deep copy of shot history

    updatedShotHistory.push({ 
      knocked: amount,
      didStrike: curFrame.didStrike, 
      frameIndex: frameCounter
    });
    
    if (turn === curFrame.turns.length-1 || curFrame.didStrike) {
      turn = 0;
      frameCounter++;
      pinsLeft = maxPins;
    } else {
      turn++;
    }

    this.setState({
      pinsLeft: pinsLeft,
      frames: framesCopy,
      turn: turn,
      curScore: curScore,
      frameCounter: frameCounter,
      shotHistory: updatedShotHistory
    }) 
  }
  
  render() {
  var { frames, frameCounter, pinsLeft } = this.state;
    console.log(frames);
    return (
      <div>
        <ScoreBoard frames={frames} frameCounter={frameCounter}/>
        <Pins onClick={this.onPinClick} pinsLeft={pinsLeft}/>
      </div>
    )
  }
}

window.App = App;

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

