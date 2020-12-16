import React, { Component } from 'react';
import styles from './ProductCard.css.js'
import Card from '@material-ui/core/Card';
import Description from '../ShortDescription'
import { Divider } from '@material-ui/core';
import {Link} from 'react-router-dom'

class ProductCard extends Component {
  cleanName(name){
    name = name.replace(", S.A. de C.V.", "")
    name = name.replace(", S.A.P.I. de C.V.", "")
    name = name.replace(", SOFOM","")
    name = name.replace(", E.N.R.","")
    return name
  }
  getSlug(title){
    if(title){
      title = this.cleanName(title)
      // remove spaces and replace with dashes      
      title = title.replace(/[\s+]/g, '-').toLowerCase()
      // Remove accents from letters
      title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      // remove non alapha numeric chars.  Also allow - and _
      title = title.replace(/[^a-zA-Z0-9-_]/g, '');
      title = encodeURIComponent(title)    
      return title  
    }
      
    return ""
  }
  getLenderName(lender){
    if(lender.short_name)
      return lender.short_name
    else if (lender.name)
      return lender.name
    return ""
  }
  render() {
    let  {product} = this.props
    var title = product.description.name.toLowerCase()

    return (
      <Card style={styles.ProductCard}>
        <div style={styles.Title}>
          <Link to={`/financieras/${this.getSlug(this.getLenderName(product.lender))}/${product.lender_id}/prestamos/${this.getSlug(title)}/${product.id}`}> {title}</Link>
        </div>
        <div style={styles.Lender}>{product.lender.short_name}</div>
        <Divider style={{marginTop:'15px',marginBottom:'15px'}}/>
        <Description product={product} />
      </Card>
    );
  }
}

export default ProductCard;
