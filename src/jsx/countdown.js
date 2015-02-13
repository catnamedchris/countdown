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
    var hour = this.props.hours;
    var nextHour = hour >= 11 ? hour - 11 : hour - 1;
    var minute = this.props.minutes;
    var nextMinute = minute >= 11 ? minute - 11 : minute - 1;
    var second = this.props.seconds;
    var nextSecond = second >= 11 ? second - 11 : second - 1;

    function split(n) {
      return [Math.floor(n / 10), n % 10];
    }

    var hourSplit = split(hour);
    var nextHourSplit = split(nextHour);
    var minuteSplit = split(minute);
    var nextMinuteSplit = split(nextMinute);
    var secondSplit = split(second);
    var nextSecondSplit = split(nextSecond);

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
    this.setState({
      flippable: {
        hourTens: Math.floor(this.props.hours / 10) !== Math.floor(nextProps.hours / 10),
        hourOnes: this.props.hours % 10 !== nextProps.hours % 10,
        minuteTens: Math.floor(this.props.minutes / 10) !== Math.floor(nextProps.minutes / 10),
        minuteOnes: this.props.minutes % 10 !== nextProps.minutes % 10,
        secondTens: Math.floor(this.props.seconds / 10) !== Math.floor(nextProps.seconds / 10),
        secondOnes: this.props.seconds % 10 !== nextProps.seconds % 10
      }
    });
  }
});

module.exports = Countdown;
