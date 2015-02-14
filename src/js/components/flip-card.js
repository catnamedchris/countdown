var React = require('react');

var FlipCard = React.createClass({

  getDefaultProps: function() {
    return { current: '', next: '' };
  },

  getInitialState: function() {
    return {
      current: this.props.current,
      next: this.props.next,
      onTransitionEndCurrentTop: null,
      onTransitionEndNextBottom: null,
      isReset: true
    };
  },

  render: function() {
    return (
      <div className="flipcard">
        <p className="next top"><span>{this.state.next}</span></p>
        <p className="current bottom"><span>{this.state.current}</span></p>
        <p className="next bottom"><span>{this.state.next}</span></p>
        <p className="current top"><span>{this.state.current}</span></p>
      </div>
    );
  },

  componentWillReceiveProps: function(props) {
    if (!props.flippable[props.id]) return;

    var el = this.getDOMNode();
    var currentTop = el.querySelector('.current.top');
    var nextBottom = el.querySelector('.next.bottom');
    var flipClassName = ' flip';

    function onTransitionEndNextBottom(e) {
      var flipRgx = /\s+flip/g;
      this.setState({ current: props.current, next: props.next }, function() {
        currentTop.className = currentTop.className.replace(flipRgx, '');
        nextBottom.className = nextBottom.className.replace(flipRgx, '');
      });
    }

    function onTransitionEndCurrentTop(e) {
      nextBottom.className += flipClassName;
    }

    currentTop.removeEventListener('transitionend', this.state.onTransitionEndCurrentTop);
    nextBottom.removeEventListener('transitionend', this.state.onTransitionEndNextBottom);
    currentTop.addEventListener('transitionend', onTransitionEndCurrentTop.bind(this));
    nextBottom.addEventListener('transitionend', onTransitionEndNextBottom.bind(this));

    this.setState({
      onTransitionEndCurrentTop: onTransitionEndCurrentTop,
      onTransitionEndNextBottom: onTransitionEndNextBottom
    });

    if (this.state.isReset) {
      el.querySelector('.next.top span').innerText = props.current;
      el.querySelector('.next.bottom span').innerText = props.current;
    }

    currentTop.className += flipClassName;
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.flippable[nextProps.id];
  }

});

module.exports = FlipCard;
