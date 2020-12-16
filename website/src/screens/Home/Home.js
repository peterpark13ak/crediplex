import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import SearchForm from '../../components/SearchForm'
import Gallery from '../../components/Gallery'

class Home extends Component {
  render() {    
    return <div> 
              <Typography style={{color:'black'}} component="h2" variant="title" gutterBottom> 
                  Encuentra tu Crédito
              </Typography>
              <SearchForm handleSearch={this.props.handleSearch} />  
              <Gallery />  
          </div>
  }
}

export default Home;
