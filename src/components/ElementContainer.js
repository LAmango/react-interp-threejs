import React, {Component} from 'react'


class ElementContainer extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.child !== nextProps.child;
  }

  componentDidUpdate (prevProps) {
    this._updateChild(prevProps);
  }

  componentDidMount () {
    this._updateChild({});
  }

  _updateChild (prevProps) {
    const wrap = this.container;
    const next = this.props.child;
    const prev = prevProps.child;

    if (next) {
      wrap.appendChild(next);
    }

    if (prev && prev !== next && prev.parentNode === wrap) {
      wrap.removeChild(prev);
    }
  }

  render () {
    return (
      <div className="w-full h-full" id={this.props.id} ref={c => { this.container = c; }} />
    );
  }
};

export default ElementContainer;