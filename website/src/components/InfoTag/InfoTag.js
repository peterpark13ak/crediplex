import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import Chip from  '@material-ui/core/Chip';
import InfoIcon from  '@material-ui/icons/InfoOutlined';
import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import styles from './InfoTag.css.js'
class InfoTag extends Component {
  state = {
    anchorEl: null,
  };


  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {    
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let content = ""
    let popover = ""
    
    if (this.props.format !== 'text' && this.props.showInfo !== false){
      content = <Chip 
      label={this.props.title} style={styles.Container} 
      variant="outlined"
      onDelete={this.handlePopoverOpen} 
      deleteIcon={<InfoIcon color='primary'  />}          
      />
    }
    else if (this.props.format !== 'text' && this.props.showInfo === false){
      content = <Chip 
      label={this.props.title} style={styles.Container} 
      variant="outlined" /> 
    }
    else if (this.props.format === 'text' && this.props.showInfo !== false){
      content = <span onClick={this.handlePopoverOpen}>{this.props.title} <InfoIcon  style={{margin:'0px 0px -5px 0px', color:'#CCC'}} /> </span>
    }
    else if (this.props.format === 'text' && this.props.showInfo === false){
      content = <span onClick={this.handlePopoverOpen}>{this.props.title}  </span>
    }
    if (this.props.showInfo !== false){

      popover = <Popover 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}      
      onClose={this.handlePopoverClose}
      open={open}
      anchorEl={anchorEl}      
    >
    <Paper >
      {this.props.children}  
    </Paper>
    </Popover> 
    }

    return  (
      <div style={{display:'inline-block', padding:'2px'}}>
        {content}
        {popover}
      </div>
    ) 
  }
}

export default InfoTag;
