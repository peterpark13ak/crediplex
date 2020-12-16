import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'

class CategoryCard extends Component {
  state = {
    raised: false
  }
  constructor(props){
    super(props)
    this.sluggify = this.sluggify.bind(this)
  }
 sluggify(str){
  return str.replace(/\s+/g, '-').toLowerCase();
   
 }
  onMouseOver = () => {this.setState({ raised: true })};
  onMouseOut = () => this.setState({ raised: false });  
  render() {
    return <div> 
              <Link to={this.props.baseurl+this.sluggify(this.props.name)}>
                <Card 
              
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}              
                raised={this.state.raised}
                key={this.props.name}
                style={{color:'black',paddingTop:'25px',paddingBottom:'25px'}} > 
                    <div >{this.props.name}</div> <div style={{fontSize:'14px'}}>({this.props.count} {this.props.title})</div> 
                </Card>
                </Link>                
            </div>
  }
}

export default CategoryCard;
