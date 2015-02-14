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
    console.log('componentWillReceiveProps: ' + props.id);
    if (!props.flippable[props.id]) return;

    var el = this.getDOMNode();
    var currentTop = el.querySelector('.current.top');
    var nextBottom = el.querySelector('.next.bottom');
    var that = this;

    function onTransitionEndNextBottom(e) {
      console.log('onTransitionEndNextBottom: ' + props.id, e, that.state, props);

      that.setState({ current: props.current, next: props.next }, function() {
        currentTop.className = currentTop.className.replace(/\s+flip/g, '');
        nextBottom.className = nextBottom.className.replace(/\s+flip/g, '');
        console.log('flip done: ' + props.id, Date.now(), that.state);
      });
    }

    function onTransitionEndCurrentTop(e) {
      console.log('onTransitionEndCurrentTop: ' + props.id, e, that.state, props);
      nextBottom.className += ' flip';
    }

    currentTop.removeEventListener('transitionend', this.state.onTransitionEndCurrentTop);
    currentTop.addEventListener('transitionend', onTransitionEndCurrentTop);
    nextBottom.removeEventListener('transitionend', this.state.onTransitionEndNextBottom);
    nextBottom.addEventListener('transitionend', onTransitionEndNextBottom);

    this.setState({
      onTransitionEndCurrentTop: onTransitionEndCurrentTop,
      onTransitionEndNextBottom: onTransitionEndNextBottom
    });

    if (this.state.isReset) {
      el.querySelector('.next.top span').innerText = props.current;
      el.querySelector('.next.bottom span').innerText = props.current;
    }

    console.log('will flip: ' + props.id, this.state, props);
    currentTop.className += ' flip';
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('shouldComponentUpdate: ' + nextProps.id, nextProps, nextState);
    return nextProps.flippable[nextProps.id];
  }

});

module.exports = FlipCard;
