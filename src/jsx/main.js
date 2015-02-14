var React = require('react');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var DropDownMenu = mui.DropDownMenu;
var TimePicker = require('./time-picker.js');
var Countdown = require('./countdown.js');

var Main = React.createClass({

  getInitialState: function() {
    return { alarm: null, countdown: null, hours: 0, minutes: 0, seconds: 0 };
  },

  render: function() {
    return (
      <div id="main">

        <Countdown
          hours={this.state.hours}
          minutes={this.state.minutes}
          seconds={this.state.seconds} />

        <div className="time-picker-container">
          <TimePicker onTimeChange={this._handleTimeChange} />
        </div>

      </div>
    );
  },

  _handleTimeChange: function(hour, minute, ampm) {
    if (isNaN(hour) || isNaN(minute) || !ampm || ampm.length === 0) return;

    var MS_PER_DAY = 24 * 60 * 60 * 1000;
    var MS_PER_MINUTE = 60 * 1000;
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var currentSecond = currentDate.getSeconds();
    var currentMsec = currentDate.getMilliseconds();
    var ampmOffset = ampm === 'AM' ? 0 : 12;
    var laterHour = hour === 12 ? ampmOffset : hour + ampmOffset;
    var laterMinute = minute;
    var currentMs = 1000 * (60 * (60 * currentHour + currentMinute) + currentSecond) + currentMsec;
    var laterMs = MS_PER_MINUTE * (60 * laterHour + laterMinute)
    var wait;

    if (currentMs < laterMs) {
      wait = laterMs - currentMs;
    } else if (currentMs > laterMs) {
      wait = (MS_PER_DAY - currentMs) + laterMs;
    }
    console.log('wait: ' +  wait + ' ms');

    var hours = Math.floor(wait / MS_PER_MINUTE / 60);
    var minutes = Math.floor((wait - (hours * 60 * MS_PER_MINUTE)) / MS_PER_MINUTE);
    var seconds = Math.floor((wait - (hours * 60 * MS_PER_MINUTE) - (minutes * MS_PER_MINUTE)) / 1000);
    console.log(hours, minutes, seconds, hours * 60 * MS_PER_MINUTE + minutes * MS_PER_MINUTE + seconds * 1000);

    var that = this;
    if (this.state.alarm) clearTimeout(this.state.alarm);
    console.log('handleTimeChange');
    this.setState({
      alarm: setTimeout(function() {
        console.log('It\'s the final countdown!');
      }, wait),
      wait: wait,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      countdown: setInterval(function() {
      console.log('main ' + Date.now());
        if (that.state.hours <= 0 && that.state.minutes <= 0 && that.state.seconds <= 0) {
          clearInterval(that.state.countdown);
        } else {
          var wait = that.state.wait - 1000;
          var hours = Math.floor(wait / MS_PER_MINUTE / 60);
          var minutes = Math.floor((wait - (hours * 60 * MS_PER_MINUTE)) / MS_PER_MINUTE);
          var seconds = Math.floor((wait - (hours * 60 * MS_PER_MINUTE) - (minutes * MS_PER_MINUTE)) / 1000);

          that.setState({
            //alarm: 
            wait: wait,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          });
        }
      }, 2000)
    });
  }
});

module.exports = Main;
