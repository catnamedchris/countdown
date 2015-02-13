module.exports = {
  formatDoubleDigits: function(n) {
    return n < 10 ? '0' + n : '' + n;
  },

  _isValidClockNumber: function(n, min, max, text) {
    if (isNaN(n)) return false;
    if (text && n != text.replace(/^0+/, '')) return false;
    return n >= min && n <= max;
  },

  isValidHour: function(n, text) {
    return this._isValidClockNumber(n, 1, 12, text);
  },

  isValidMinute: function(n, text) {
    return this._isValidClockNumber(n, 0, 59, text);
  }
};
