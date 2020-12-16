import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'

class CategoryCard extends Component {
  state = {
    raised: false
  }

  sluggify = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase()
  }

  onMouseOver = () => {
    this.setState({ raised: true })
  }
  
  onMouseOut = () => {
    this.setState({ raised: false })
  }

  render() {
    const {data} = this.props
    var cursor = data.addresses[0]
    return (
      <div> 
        <Link to={this.props.baseurl + data.id} style={{textDecoration: 'none'}}>
          <Card 
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            raised={this.state.raised}
            key={this.props.name}
            style={{color:'black', padding:'24px 12px 24px 12px', minHeight: '145px', position: 'relative'}} > 
            <div style={{top: 0, bottom: 0, marginTop: 'auto'}}>
              <div style={{fontSize: '22px'}}>{data.name}</div>
              <div style={{fontSize: '18px', marginTop: '6px'}}>
                {cursor.federal_entity + ' ' + cursor.municipio + ' ' + cursor.colonia + ' ' + cursor.street + ' ' + cursor.street_number}
              </div>
            </div>
          </Card>
        </Link>
      </div>
    )
  }
}

export default CategoryCard;
