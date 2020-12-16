import React, { Component } from 'react';
import styles from './LenderCard.css.js'
import Card from '@material-ui/core/Card';
import LenderDescription from '../LenderDescription';
import Logo from '../Logo'
import Typography from '@material-ui/core/Typography';
import {Launch, Call} from '@material-ui/icons';
import { Divider } from '@material-ui/core';

import * as yup from 'yup'

const validator = yup.object().shape({
  website: yup.string().url()
})

class LenderCard extends Component {
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
  getSlug(title){
    if(title)
      return title.replace(/[\s+,]/g, '-').toLowerCase();
    return ""
  }
  getLenderName(lender){
    if(lender.short_name)
      return lender.short_name
    else if (lender.name)
      return lender.name
    return ""
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
  cleanName(name){
    name = name.replace(", S.A. de C.V.", "")
    name = name.replace(", S.A.P.I. de C.V.", "")
    name = name.replace(", SOFOM","")
    name = name.replace(", E.N.R.","")
    return name
  }
  displayWebsite(product){
    try{
      validator.validateSync({website:"http://"+product.lender.website},{ abortEarly: false })
      return <a href={"http://"+product.lender.website}>{product.lender.website} <Launch /></a>
    }
    catch(e){
      //  console.log(e)
    }
  }
  render() {
    let  {product} = this.props

    return (
      <Card style={styles.Lender}>        
        <Typography component="h1" variant="headline" align="left" style={styles.Title}> 
          Prestador
        </Typography>
        <Divider/>
        <div style={{color:'black', position: 'relative'}}>
          <p>Nombre :<br/>{this.cleanName(product.lender.name)}</p>
        </div>
        <Logo src={product.lender.logo} title="logo"/> 
        <LenderDescription lender={product.lender} />
        <Typography component="h2" variant="subheading" align="left">
          <a href={"http://"+product.lender.website}>{product.lender.website} <Launch /></a>
          {this.displayPhoneNumbers(product)}              
        </Typography>            
      </Card>        
    )
  }
}

 

export default LenderCard;
