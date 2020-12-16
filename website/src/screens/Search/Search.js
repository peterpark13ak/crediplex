import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import SearchForm from '../../components/SearchForm'

class Search extends Component {
  render() {    
    return <div> 
              <Typography style={{color:'black'}} component="h2" variant="title" gutterBottom> 
                  Encuentra tu Crédito
              </Typography>
              <SearchForm handleSearch={this.props.handleSearch} />    
          </div>
  }
}

export default Search;
