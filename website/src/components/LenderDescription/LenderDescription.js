import { Component } from 'react';
import graphs from './graphs'
class LenderDescription extends Component {

  getCoverageAreaDescription(products){
    let areas = []
    products.forEach(function(product){      
      product.details.coverage_area.forEach(function(area){
        areas.push(area)
      })
    })
    areas =  [...new Set(areas)];
    if(areas.includes('Todos los Estados'))
      return "Todos los Estados"
    return areas.join(', ')
 }
 getAddressStateList(addresses){
   if(addresses.length <=0) {
     return ""
   }
   return addresses[0].federal_entity
 }
 cleanName(name){
  name = name.replace(", S.A. de C.V.", "")
  name = name.replace(", S.A.P.I. de C.V.", "")
  name = name.replace(", SOFOM","")
  name = name.replace(", E.N.R.","")
  return name
}
render() {
      let lender = this.props.lender
  
      // let lender_id = parseInt(lender.id)
      let params = {
        COMPANY_NAME:this.cleanName(lender.name),
        SECTOR:lender.detail.sector,
        COVERAGE_AREA_LIST:this.getCoverageAreaDescription(lender.products),
        ADDRESS_STATE_LIST: this.getAddressStateList(lender.detail.addresses),
        COMPANY_WEBSITE_URL:lender.website,
        COMPANY_EMAIL:lender.detail.email,
        MAIN_ACTIVITY:lender.detail.main_activity,
        START_DATE:lender.detail.launch_date

      }
      return graphs.get(params);
  }
}

export default LenderDescription;
