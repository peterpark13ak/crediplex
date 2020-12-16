import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

class NavBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
}

  render() {
    return (
        <div>
        <Paper >
           <div> Search Results! </div> 
        </Paper>
            These are the search results
        </div>
    );
  }
}

export default NavBar;

