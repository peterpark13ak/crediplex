import React, { Component } from 'react';
import LenderListItems from './LenderListItems'
import {withRouter } from 'react-router-dom'
import {Helmet} from "react-helmet";
import client from '../../utils/client'
import Grid from '@material-ui/core/Grid'
import Product from '../../components/Product'

class LenderPage extends Component {
  _isMounted = false
  state = {
    lender:[],
    similar: [],
  }
  constructor(props){
      super(props)
      this.loadData = this.loadData.bind(this)
  }
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
  async componentDidMount(){
    this._isMounted = true;
    await this.loadData(this.props.id)  
  }
  async componentDidUpdate(prevProps, prevStates){
    if (this.props.location !== prevProps.location) {
      await this.loadData(this.props.id)
    }
  }
  async loadData(id){
    try{
      let lender = await client.getLenderById(id)
      let similarLenders = await client.getSimilarLenders(id)
      if(this._isMounted){
        this.setState({lender:lender.data, similar:similarLenders.data})
      }  
    }
    catch(e){
      console.log(e)
    }
  }

  render() {
    const {baseurl} = this.props
    const {lender, similar} = this.state
    return (
      <div style={{color:'black',paddingTop:'20px'}}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Crediplex - Directorio de Préstamos en México</title>
          <link rel="canonical" href="http://crediplex.io/prestamos" />
          <meta name="description" content="Directorio de préstamos en cada estado de México. Presione el estado para ver una lista de prestamos y prestamistas en el estado."/>
        </Helmet>
        {lender.details && lender.details.short_name}
        <div style={{textAlign: 'left', fontSize: '18px', marginTop: '20px'}}>

          <Grid container spacing={8}>
            <Grid item xs={12} md={3}>Dirección :</Grid>
            <Grid item xs={12} md={9}>
            {
              lender.addresses && lender.addresses.map((cursor, index) => {
                return (
                  <div style={{marginBottom: '4px'}} key={index}>
                    {cursor.federal_entity + ' ' + cursor.municipio + ' ' + cursor.colonia + ' ' + cursor.street + ' ' + cursor.street_number}
                  </div>
                )
              })
            }
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} md={3}>Estado :</Grid>
            <Grid item xs={12} md={9}>{lender.details && lender.details.status}</Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} md={3}>Sector :</Grid>
            <Grid item xs={12} md={9}>{lender.details && lender.details.sector}</Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} md={3}>Sitio web :</Grid>
            <Grid item xs={12} md={9}>
              <a href={'https://' + (lender.details && lender.details.website)}>
              {lender.details && lender.details.website}
              </a>
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} md={3}>Sic Data :</Grid>
            <Grid item xs={12} md={9}>{lender.details && lender.details.sic_data}</Grid>
          </Grid>


          <Grid container spacing={8}>
            <Grid item xs={12} md={3}>Prestamistas Similares :</Grid>
            <Grid item xs={12} md={9}>
    
              <Grid container spacing={8}>
              {similar && similar.slice(0, 3).map((cursor) => {
                return (
                  <Grid item xs={12} md={4} key={cursor.name}>
                    <LenderListItems baseurl={baseurl + this.getSlug(cursor.name) + '/'} data={cursor}/>
                  </Grid>
                )
              })
              }
              </Grid>

            </Grid>
          </Grid>

          <div>Producto : </div>
          <Grid container spacing={8}>
            {lender.products && lender.products.map((product)=>{
              return <Grid item xs={12} sm={4} key={product.id}><Product key={product.id} viewMode="summary" product={product}  /></Grid>
          })}
          </Grid>

        </div>
      </div>
    );
  }
}

export default withRouter(LenderPage);
