import React, { Component } from 'react';
import styles from './ProductDetails.css.js'
import { Card} from  '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Description from '../LongDescription'
import { Divider } from '@material-ui/core';
import {Launch, Call} from '@material-ui/icons';
import * as yup from 'yup'

const validator = yup.object().shape({
  website: yup.string().url()
})


class ProductDetails extends Component {
  cleanName(name){
    name = name.replace(", S.A. de C.V.", "")
    name = name.replace(", S.A.P.I. de C.V.", "")
    name = name.replace(", SOFOM","")
    name = name.replace(", E.N.R.","")
    return name
  }
  getSlug(title){
    return title.replace(/\s+/g, '-').toLowerCase();
  }  
  getPhones(product){
    let result = []
    let phones =  product.lender.phone.split(/\s{2,}/)
    for(let phone of phones){
      let display_phone = phone.trim()
      let dial_phone= phone.replace(/\D/g,'');
      result.push({display:display_phone, dial:dial_phone})
    }
    return result
  }
  displayPhoneNumbers(product){
    let elements = []
    let phones = this.getPhones(product)
    let count = 0
    for (let phone of phones){
      count++
      elements.push(<div key={phone.dial + "_" + count} ><a href={"tel:"+phone.dial}>{phone.display} <Call /></a></div>)
    }
    return elements
  }
  displayWebsite(product){
    try{
      validator.validateSync({website:"http://"+product.lender.website},{ abortEarly: false })
      return <a href={"http://"+product.lender.website}>{product.lender.website} <Launch /></a>
    }
    catch(e){
      // console.log(e)
    }
  }
  render()   {    
    let  {product} = this.props
    if (!product || product.description === undefined ){
      return <div style={styles.Product} >Product not found</div> 
    }

    let title = product.description.name.toLowerCase()

    return (
      <React.Fragment>
        <Card style={styles.Product}>  
          <div style={styles.Title}>
            Producto
          </div>
          <Divider style={{marginTop:'15px',marginBottom:'15px'}}/>
          <div style={{fontSize:'20px', color:'black'}}>
            <p>{'Titulo : ' + title}</p>
          </div>
          <Description product={product} />
        </Card>
     </React.Fragment>

    );
  }
}

export default withStyles(styles)(ProductDetails);
