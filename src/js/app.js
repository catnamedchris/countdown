window.onload = function() {
  var React = require('react');
  var injectTapEventPlugin = require("react-tap-event-plugin");
  var Main = require('./main.js');

  //Needed for onTouchTap
  injectTapEventPlugin();

  React.render(<Main />, document.body);
};
