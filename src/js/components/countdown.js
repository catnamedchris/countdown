var React = require('react');
var FlipCard = require('./flip-card.js');

var Countdown = React.createClass({

  getInitialState: function() {
    return {
      flippable: {
        hourTens: false,
        hourOnes: false,
        minuteTens: false,
        minuteOnes: false,
        secondTens: false,
        secondOnes: false
      }
    };
  },

  render: function() {
    function splitInt(n) {
      if (n === 0) return [0, 0];
      if (n < 10) return [0, n];

      var result = [];
      while (n !== 0) {
        result.unshift(n % 10);
        n = Math.floor(n / 10);
      }
      return result;
    }

    function treadmillDecrement(n) { return n === 0 ? 9 : n - 1; }

    var clockVals = [
      this.props.hours,
      this.props.minutes,
      this.props.seconds
    ].map(function(n) {
      var split = splitInt(n);
      return [split, split.map(treadmillDecrement)];
    });

    return (
      <div id="countdown">

        <div className="hours">
          <h2>HOURS</h2>

          <FlipCard
            id="hourTens"
            current={clockVals[0][0][0]}
            next={clockVals[0][1][0]}
            flippable={this.state.flippable} />

          <FlipCard
            id="hourOnes"
            current={clockVals[0][0][1]}
            next={clockVals[0][1][1]}
            flippable={this.state.flippable} />
        </div>

        <div className="clock-colon" />

        <div className="minutes">
          <h2>MINUTES</h2>

          <FlipCard
            id="minuteTens"
            current={clockVals[1][0][0]}
            next={clockVals[1][1][0]}
            flippable={this.state.flippable} />

          <FlipCard
            id="minuteOnes"
            current={clockVals[1][0][1]}
            next={clockVals[1][1][1]}
            flippable={this.state.flippable} />
        </div>

        <div className="clock-colon" />

        <div className="seconds">
          <h2>SECONDS</h2>

          <FlipCard
            id="secondTens"
            current={clockVals[2][0][0]}
            next={clockVals[2][1][0]}
            flippable={this.state.flippable} />

          <FlipCard
            id="secondOnes"
            current={clockVals[2][0][1]}
            next={clockVals[2][1][1]}
            flippable={this.state.flippable} />
        </div>
      </div>
    );
  },

  componentWillReceiveProps: function(nextProps) {
    function isEqualTensPlace(a, b) {
      return Math.floor(a / 10) === Math.floor(b / 10);
    }

    function isEqualOnesPlace(a, b) {
      return a % 10 === b % 10;
    }

    this.setState({
      flippable: {
        hourTens: !isEqualTensPlace(this.props.hours, nextProps.hours),
        hourOnes: !isEqualOnesPlace(this.props.hours, nextProps.hours),
        minuteTens: !isEqualTensPlace(this.props.minutes, nextProps.minutes),
        minuteOnes: !isEqualOnesPlace(this.props.minutes, nextProps.minutes),
        secondTens: !isEqualTensPlace(this.props.seconds, nextProps.seconds),
        secondOnes: !isEqualOnesPlace(this.props.seconds, nextProps.seconds)
      }
    });
  }

});

module.exports = Countdown;
