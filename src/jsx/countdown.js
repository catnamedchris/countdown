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
    function split(n) { return [Math.floor(n / 10), n % 10]; }

    function treadmillDecrement(n) { return n === 0 ? 9 : n - 1; }

    var hour = this.props.hours;
    var minute = this.props.minutes;
    var second = this.props.seconds;
    var hourSplit = split(hour);
    var nextHourSplit = hourSplit.map(treadmillDecrement);
    var minuteSplit = split(minute);
    var nextMinuteSplit = minuteSplit.map(treadmillDecrement);
    var secondSplit = split(second);
    var nextSecondSplit = secondSplit.map(treadmillDecrement);
    console.log('secondSplits:', secondSplit, nextSecondSplit);

    return (
      <div id="countdown">

        <FlipCard
          id="hourTens"
          current={hourSplit[0]}
          next={nextHourSplit[0]}
          flippable={this.state.flippable} />

        <FlipCard
          id="hourOnes"
          current={hourSplit[1]}
          next={nextHourSplit[1]}
          flippable={this.state.flippable} />

        <div className="clock-colon" />

        <FlipCard
          id="minuteTens"
          current={minuteSplit[0]}
          next={nextMinuteSplit[0]}
          flippable={this.state.flippable} />

        <FlipCard
          id="minuteOnes"
          current={minuteSplit[1]}
          next={nextMinuteSplit[1]}
          flippable={this.state.flippable} />

        <div className="clock-colon" />

        <FlipCard
          id="secondTens"
          current={secondSplit[0]}
          next={nextSecondSplit[0]}
          flippable={this.state.flippable} />

        <FlipCard
          id="secondOnes"
          current={secondSplit[1]}
          next={nextSecondSplit[1]}
          flippable={this.state.flippable} />

      </div>
    );
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('countdown: componentwillreceiveprops', this.props, nextProps, Date.now());

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
