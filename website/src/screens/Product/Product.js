import React, { Component } from 'react';
import ProductDetail from '../../components/Product'
import LenderCard from '../../components/LenderCard';
import Grid from '@material-ui/core/Grid'
import client from '../../utils/client'
import {Helmet} from "react-helmet";
import {withRouter } from 'react-router-dom'
import CommissionTable from '../../components/Product/CommissionTable'
import ContractTable from '../../components/Product/ContractTable'
import { Card } from  '@material-ui/core';
import { Divider } from '@material-ui/core';

class Product extends Component {
  _isMounted = false
  state= {
    product:undefined,
    likeProducts:[]
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
  async loadData(product_id){
    if(!product_id){
      return
    }
    let product =  client.getProductById(product_id)
    let likeProducts = client.getProductsLike(product_id)
    product = await product

    if(this._isMounted){        
      this.setState({product:product.data})
      likeProducts = await likeProducts
      this.setState({likeProducts:likeProducts.data})
    }        
  } 
  async componentDidMount(){
    this._isMounted = true;
    await this.loadData(this.props.id)  
  }

  componentWillUnmount(){
      this._isMounted = false;
  }

  calculateTotalLoanCost = (loan) => {
    const { product } = this.state
    var totalcost = loan
    product.commissions && product.commissions.map((cursor)=>{
      if (cursor.cost) {
        if (cursor.cost.fixed_amount !== '') {
          totalcost += parseInt(cursor.cost.fixed_amount)
        }
        else if (cursor.cost.factor_amount !== '') {
          totalcost += loan * parseFloat(cursor.cost.factor_amount) / 100
        }
      }
      return null;
    })
    product.contract_costs && product.contract_costs.map((cursor)=>{
      if (cursor.cost) {
        if (cursor.cost.fixed_amount !== '') {
          totalcost += parseInt(cursor.cost.fixed_amount)
        }
        else if (cursor.cost.factor_amount !== '') {
          totalcost += loan * parseFloat(cursor.cost.factor_amount) / 100
        }        
      }
      return null;
    })
    return totalcost
  }

  calculateCAT = (principal) => {
    const { product } = this.state
    const number_of_payment = 12
    const interest_rate = product.details.max_annual_interest / 1200
    const CAT = number_of_payment * interest_rate * principal / (1 - Math.pow(1 + interest_rate, -number_of_payment))
    return CAT
  }

  render() {
    let product = this.state.product
    const loan = 2000
    if(!product){
      return <div></div>
    }
    let title =  product.description.name.toLowerCase()
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href={`http://crediplex.io${this.props.history.location.pathname}`} />
          <title>Crediplex - Préstamos México: {this.cleanName(product.lender.name)} -- {title} </title>               
        </Helmet> 
        <div style={{width: '100%'}}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={9} key={1}>
              <ProductDetail product={this.state.product}  viewMode="detail" />;   
            </Grid>       
            <Grid item xs={12} sm={3} key={2}>
              <LenderCard product={this.state.product} />
            </Grid>               
            <Grid item xs={12} sm={12} key={3} style={{marginTop: '20px'}}>
              <CommissionTable product={this.state.product} />
            </Grid>
            <Grid item xs={12} sm={12} key={4} style={{marginTop: '4px'}}>
              <ContractTable product={this.state.product} />
            </Grid>
          </Grid>
          <Grid container spacing={8} justify="center">
            <Grid item xs={12} sm={9}>
              <Grid container spacing={8} justify="center" style={{marginTop: '30px'}}>
                <Grid item xs={12} sm={12}><div style={{color: '#000'}}>Prestamos Similares</div></Grid>
                {this.state.likeProducts.map((product)=>{
                  return <Grid item xs={12} sm={4} key={product.id}><ProductDetail key={product.id} viewMode="summary" product={product}  /></Grid>
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card style={{color: 'black', fontSize: '16px', textAlign: 'right', padding: '16px'}}>
                <p>{'- Cuando pides prestado ' + loan + ' Pesos -'}</p>
                <p>{'Monto del préstamo: ' + loan}</p>
                <p>{'Tasa de interés : ' + product.details.max_annual_interest}</p>
                <p>{'Comisiones y honorarios: ' + (this.calculateTotalLoanCost(loan) - loan)}</p>

                {product.details.max_annual_interest &&
                  <div>
                    <p>{'Interés total: ' + (this.calculateCAT(loan) - loan).toFixed(1)}</p>
                    <p>{'Costo total anual: ' + this.calculateCAT(loan).toFixed(1)}</p>
                  </div>
                }

                {(!product.details.max_annual_interest || !product.details.max_annual_interest) &&
                  <div>
                    <p>No hay suficiente información sobre el préstamo.</p>
                  </div>
                }

              </Card>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Product);
