import React, { Component } from 'react';
import { CardMedia } from  '@material-ui/core';
class Logo extends Component {
  render() {
    return <CardMedia  style={{maxWidth:'200px', marginLeft:'auto', 'marginRight':'auto'}}
    component="img"
    src={this.props.src}
    title={this.props.title} />
  }
}

export default Logo;
