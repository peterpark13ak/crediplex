import React, { Component } from 'react';
import HomePage from './pages/home';
import Search from './pages/search';
import SearchResults from './pages/SearchResults';
import Four04 from './pages/four04';

// import state from './store/AllState'

class Route extends Component {
    constructor(props){
        super(props)
        this.state = props.state

    }
    render() {    
        if(this.state.path === "" | this.state.path === "/"| this.state.path === "/home"){

            return (<HomePage state = {this.state} />)            
        }
            
        if (this.state.path === "/search")
            return (<Search state={this.state} />)
        else if (this.state.path === "/search-results")
            return (<SearchResults state={this.state} />)
        else {
            return (<Four04 />)
        }
    }
}

export default Route;
