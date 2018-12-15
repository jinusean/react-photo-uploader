import React, { Component } from 'react';
import './TextHr.scss';

class TextHr extends Component {
  render() {
    return (
      <div className="text-hr">
        <span className="line" />
        <span className="text">{this.props.children}</span>
        <span className="line" />
      </div>
    );
  }
}

export default TextHr;
