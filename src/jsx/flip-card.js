var React = require('react');
var $ = require('../js/vendor/jquery.js');

var FlipCard = React.createClass({

  getDefaultProps: function() {
    return { current: '', next: '' };
  },

  getInitialState: function() {
    return { current: this.props.current, next: this.props.next };
  },

  render: function() {
    return (
      <div className="flipcard" onClick={this.tempClick}>
        <p className="next top">
          <span>{this.state.next}</span>
        </p>
        <p className="current bottom">
          <span>{this.state.current}</span>
        </p>
        <p className="next bottom">
          <span>{this.state.next}</span>
        </p>
        <p className="current top">
          <span>{this.state.current}</span>
        </p>
      </div>
    );
  },

  tempClick: function() { if (this.props.onTempClick) this.props.onTempClick() },

  componentWillReceiveProps: function(props) {
    if (!props.flippable[props.id]) return;

    var that = this;
    var $el = $(this.getDOMNode());
    var $currentTop = $el.find('.current.top');
    var $nextBottom = $el.find('.next.bottom');

    function animateBottom() {
        $nextBottom.animate({ 'left': '0' }, {
        step: function() {
          $nextBottom.css({
            'transform': 'rotateX(-0deg)',
            'transform-origin': '50% 0%',
            'transition': 'transform 500ms linear'
          });
        },
        done: function() {
          that.setState({ current: props.current, next: props.next }, function() {
            var $el = $(that.getDOMNode());
            var $currentTop = $el.find('.current.top');
            var $currentBottom = $el.find('.current.bottom');
            var $nextTop = $el.find('.next.top');
            var $nextBottom = $el.find('.next.bottom');

            var cssNormal = {
              'transform': 'none',
              'transform-origin': '50% 0%',
              'transition': 'none'
            };
            var cssRotated = {
              'transform': 'rotateX(90deg)',
              'transform-origin': '50% 0%',
              'transition': 'none'
            };

            $currentTop.css(cssNormal);
            $currentBottom.css(cssNormal);
            $nextTop.css(cssNormal);
            $nextBottom.css(cssRotated);
          });
        }
      });
    }

    $currentTop.animate({ 'left': '0', }, {
      step: function() {
        $currentTop.css({
          'transform': 'rotateX(-90deg)',
          'transform-origin': '50% 100%',
          'transition': 'transform 500ms linear'
        });
      },
      done: animateBottom
    });
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.flippable[nextProps.id];
  }

});

module.exports = FlipCard;
