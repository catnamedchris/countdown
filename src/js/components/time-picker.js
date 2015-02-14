var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var DropDownMenu = mui.DropDownMenu;
var DateTime = require('../util/date-time.js');

var TimePicker = React.createClass({

  propTypes: {
    defaultHour: React.PropTypes.string,
    defaultMinute: React.PropTypes.string,
    defaultAmpm: React.PropTypes.string,
    onTimeChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var hoursMod = hours % 12;

    return {
      defaultHour: DateTime.formatDoubleDigits(hoursMod === 0 ? 12 : hoursMod),
      defaultMinute: DateTime.formatDoubleDigits(minutes),
      defaultAmpm: hours < 12 ? 'AM' : 'PM'
    };
  },

  getInitialState: function() {
    return {
      hour: '',
      minute: '',
      ampm: this.props.defaultAmpm,
      errorHour: '',
      errorMinute: ''
    };
  },

  render: function() {
    var { defaultHour, defaultMinute, defaultAmpm } = this.props;
    var ampmMenuItems = [{ value: 'AM', text: 'AM' }, { value: 'PM', text: 'PM' }];

    return (
      <div className="mui-time-picker">
        <div>
          <div>
            <TextField
              hintText={defaultHour}
              onChange={this._handleChangeHour}
              onBlur={this._handleBlurHour}
              onFocus={this._handleTextFieldFocus}
              errorText={this.state.errorHour}
              value={this.state.hour}
              ref="input" />
          </div>

          <div>
            <TextField
              hintText={defaultMinute}
              onChange={this._handleChangeMinute}
              onBlur={this._handleBlurMinute}
              onFocus={this._handleTextFieldFocus}
              errorText={this.state.errorMinute}
              value={this.state.minute}
              ref="input" />
          </div>

          <div>
            <DropDownMenu
              onChange={this._handleChangeMenuSelection}
              menuItems={ampmMenuItems}
              selectedIndex={this.state.ampm === 'AM' ? 0 : 1}/>
          </div>
        </div>
      </div>
    );
  },

  _handleChangeHour(e) {
    this.setState({ hour: e.target.value });
  },

  _handleChangeMinute(e) {
    this.setState({ minute: e.target.value });
  },

  _handleBlurHour: function() {
    var hour = parseInt(this.state.hour, 10);
    var formattedHour;

    if (DateTime.isValidHour(hour, this.state.hour)) {
      formattedHour = DateTime.formatDoubleDigits(hour);

      if (this.state.hour !== formattedHour) {
        this.setState(
          { hour: formattedHour, errorHour: '' },
          this._handleTimeChange);
      }
    } else {
      this.setState({ errorHour: 'Hour must be between 1-12' });
    }
  },

  _handleBlurMinute: function() {
    var minute = parseInt(this.state.minute, 10);
    var formattedMinute;

    if (DateTime.isValidMinute(minute, this.state.minute)) {
      formattedMinute = DateTime.formatDoubleDigits(minute);

      if (this.state.minute !== formattedMinute) {
        this.setState(
          { minute: formattedMinute, errorMinute: '' },
          this._handleTimeChange);
      }
    } else {
      this.setState({ errorMinute: 'Minute must be between 0-59' });
    }
  },

  _handleTextFieldFocus: function(e) {
    e.target.select();
  },

  _handleChangeMenuSelection: function(e, key, payload) {
    this.setState({ ampm: payload.value }, this._handleTimeChange);
  },

  _handleTimeChange: function() {
    if (this.props.onTimeChange) {
      this.props.onTimeChange(
        parseInt(this.state.hour, 10),
        parseInt(this.state.minute, 10),
        this.state.ampm);
    }
  }

});

module.exports = TimePicker;
