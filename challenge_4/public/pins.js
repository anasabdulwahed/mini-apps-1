"use strict";

var Pins = function Pins(props) {
  var pinsLeft = props.pinsLeft,
      _onClick = props.onClick;

  var pins = [];

  var _loop = function _loop(i) {
    pins.push(React.createElement(
      "div",
      { key: i, onClick: function onClick() {
          _onClick(i);
        }, className: "pins" },
      i
    ));
  };

  for (var i = 0; i <= pinsLeft; i++) {
    _loop(i);
  }
  return React.createElement(
    "div",
    { id: "pins-grid" },
    pins
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9waW5zLmpzeCJdLCJuYW1lcyI6WyJQaW5zIiwicHJvcHMiLCJwaW5zTGVmdCIsIm9uQ2xpY2siLCJwaW5zIiwiaSIsInB1c2giXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsT0FBTyxTQUFQQSxJQUFPLENBQUNDLEtBQUQsRUFBVztBQUFBLE1BQ2RDLFFBRGMsR0FDUUQsS0FEUixDQUNkQyxRQURjO0FBQUEsTUFDSkMsUUFESSxHQUNRRixLQURSLENBQ0pFLE9BREk7O0FBRXBCLE1BQUlDLE9BQU8sRUFBWDs7QUFGb0IsNkJBR1hDLENBSFc7QUFJbEJELFNBQUtFLElBQUwsQ0FDRTtBQUFBO0FBQUEsUUFBSyxLQUFLRCxDQUFWLEVBQWEsU0FBUyxtQkFBTTtBQUFDRixtQkFBUUUsQ0FBUjtBQUFZLFNBQXpDLEVBQTJDLFdBQVUsTUFBckQ7QUFBNkRBO0FBQTdELEtBREY7QUFKa0I7O0FBR3BCLE9BQUssSUFBSUEsSUFBSSxDQUFiLEVBQWdCQSxLQUFLSCxRQUFyQixFQUErQkcsR0FBL0IsRUFBb0M7QUFBQSxVQUEzQkEsQ0FBMkI7QUFJbkM7QUFDRCxTQUNFO0FBQUE7QUFBQSxNQUFLLElBQUcsV0FBUjtBQUNHRDtBQURILEdBREY7QUFLRCxDQWJEIiwiZmlsZSI6InBpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUGlucyA9IChwcm9wcykgPT4ge1xuICB2YXIgeyBwaW5zTGVmdCwgb25DbGljayB9ID0gcHJvcHM7XG4gIHZhciBwaW5zID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcGluc0xlZnQ7IGkrKykge1xuICAgIHBpbnMucHVzaChcbiAgICAgIDxkaXYga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiB7b25DbGljayhpKTt9fSBjbGFzc05hbWU9XCJwaW5zXCI+e2l9PC9kaXY+XG4gICAgKVxuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cInBpbnMtZ3JpZFwiPlxuICAgICAge3BpbnN9XG4gICAgPC9kaXY+XG4gICk7XG59Il19