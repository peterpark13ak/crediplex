import React, { Component } from 'react';
import InfoTag from '../../InfoTag'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
// import styles from './CoverageAreas.css.js'
class CoverageAreas extends Component {
  getCoverageAreaToShow(){
    if(this.props.areas.includes('Todos los Estados')){
      return 'Todos los Estados'
    }
    return this.props.searched_area
  }
  // 'Todos los Estados' should always be listed first
  getCoveragesInOrder(){
    if(this.props.areas.includes('Todos los Estados')){
      let reOrderedAreas = this.props.areas.filter(function(state){
        return state !== 'Todos los Estados';
      })
      reOrderedAreas.unshift('Todos los Estados');      
      return reOrderedAreas
    }
    return this.props.areas
  }
  render() {
    return  <InfoTag title={this.getCoverageAreaToShow()} format={this.props.format} >
      <List>
        <ListSubheader style={{fontSize:'20px'}}>Cobertura</ListSubheader>      
      {this.getCoveragesInOrder().map((item,index)=>{
        return  <ListItem key={index}>
                  <ListItemText>{item}</ListItemText>
                </ListItem>
      })}</List>        
    </InfoTag>
    
  }
}

export default CoverageAreas;
