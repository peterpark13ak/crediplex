import React, { Component } from 'react';

class State extends Component {
  constructor (props) {
    super(props);
    this.store = props.state
    
}
  render() {
    return (
      <div>
          State
      </div>
    );
  }
}

export default State;

