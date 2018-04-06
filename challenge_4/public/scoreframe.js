"use strict";

var ScoreFrame = function ScoreFrame(props) {
  var frame = props.frame;
  var turns = frame.turns,
      subTotal = frame.subTotal,
      hideScore = frame.hideScore;


  var turnFrameWidth = 91 / turns.length;

  var turnsFormat = {
    display: 'grid',
    gridTemplateColumns: "repeat(" + turns.length + ", " + turnFrameWidth + "px)"
  };

  return React.createElement(
    "div",
    { className: "score-frame" },
    React.createElement(
      "div",
      { className: "turns-section", style: turnsFormat },
      turns.map(function (score) {
        return React.createElement(
          "div",
          { className: "turn", style: { width: turnFrameWidth + "px" } },
          score
        );
      })
    ),
    React.createElement(
      "div",
      { className: "sub-total" },
      hideScore ? null : subTotal
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9zY29yZWZyYW1lLmpzeCJdLCJuYW1lcyI6WyJTY29yZUZyYW1lIiwicHJvcHMiLCJmcmFtZSIsInR1cm5zIiwic3ViVG90YWwiLCJoaWRlU2NvcmUiLCJ0dXJuRnJhbWVXaWR0aCIsImxlbmd0aCIsInR1cm5zRm9ybWF0IiwiZGlzcGxheSIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJtYXAiLCJ3aWR0aCIsInNjb3JlIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxLQUFELEVBQVc7QUFBQSxNQUNwQkMsS0FEb0IsR0FDVkQsS0FEVSxDQUNwQkMsS0FEb0I7QUFBQSxNQUVwQkMsS0FGb0IsR0FFV0QsS0FGWCxDQUVwQkMsS0FGb0I7QUFBQSxNQUViQyxRQUZhLEdBRVdGLEtBRlgsQ0FFYkUsUUFGYTtBQUFBLE1BRUhDLFNBRkcsR0FFV0gsS0FGWCxDQUVIRyxTQUZHOzs7QUFJMUIsTUFBSUMsaUJBQWlCLEtBQUlILE1BQU1JLE1BQS9COztBQUVBLE1BQUlDLGNBQWM7QUFDaEJDLGFBQVMsTUFETztBQUVoQkMscUNBQStCUCxNQUFNSSxNQUFyQyxVQUFnREQsY0FBaEQ7QUFGZ0IsR0FBbEI7O0FBS0EsU0FDRTtBQUFBO0FBQUEsTUFBSyxXQUFVLGFBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGVBQWYsRUFBK0IsT0FBT0UsV0FBdEM7QUFDR0wsWUFBTVEsR0FBTixDQUFVO0FBQUEsZUFDVDtBQUFBO0FBQUEsWUFBSyxXQUFVLE1BQWYsRUFBc0IsT0FBTyxFQUFDQyxPQUFVTixjQUFWLE9BQUQsRUFBN0I7QUFDR087QUFESCxTQURTO0FBQUEsT0FBVjtBQURILEtBREY7QUFRRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFdBQWY7QUFBNEJSLGtCQUFZLElBQVosR0FBbUJEO0FBQS9DO0FBUkYsR0FERjtBQVlELENBdkJEIiwiZmlsZSI6InNjb3JlZnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU2NvcmVGcmFtZSA9IChwcm9wcykgPT4ge1xuICB2YXIgeyBmcmFtZSB9ID0gcHJvcHM7XG4gIHZhciB7IHR1cm5zLCBzdWJUb3RhbCwgaGlkZVNjb3JlIH0gPSBmcmFtZTtcblxuICB2YXIgdHVybkZyYW1lV2lkdGggPSA5MS8odHVybnMubGVuZ3RoKTtcblxuICB2YXIgdHVybnNGb3JtYXQgPSB7XG4gICAgZGlzcGxheTogJ2dyaWQnLFxuICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IGByZXBlYXQoJHt0dXJucy5sZW5ndGh9LCAke3R1cm5GcmFtZVdpZHRofXB4KWAsXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2NvcmUtZnJhbWVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHVybnMtc2VjdGlvblwiIHN0eWxlPXt0dXJuc0Zvcm1hdH0+XG4gICAgICAgIHt0dXJucy5tYXAoc2NvcmUgPT4gXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0dXJuXCIgc3R5bGU9e3t3aWR0aDogYCR7dHVybkZyYW1lV2lkdGh9cHhgfX0+XG4gICAgICAgICAgICB7c2NvcmV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViLXRvdGFsXCI+e2hpZGVTY29yZSA/IG51bGwgOiBzdWJUb3RhbH08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXX0=