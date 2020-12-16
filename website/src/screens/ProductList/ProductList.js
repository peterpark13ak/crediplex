import React, { Component } from 'react';
import Product from '../../components/Product'
import {withRouter } from 'react-router-dom'
import Pager from '../../components/Pager'
import Grid from '@material-ui/core/Grid'

class ProductList extends Component {
  constructor(props){
    super(props)
    this.itemsPerPage = props.pageSize
    this.state={ 
      currentPage: parseInt(props.page)  || 1,
      total:props.products.length
    }
  }
  componentWillReceiveProps(nextprops){
    let page = nextprops.page || 1
    this.setState({total:nextprops.products.length, currentPage:page})
  }
  componentDidMount(){
    this.setState({total:this.props.products.length})
  }
  render() {
    let page = this.state.currentPage
    let productsOnPage =  this.props.products.slice(this.itemsPerPage * (page - 1), this.itemsPerPage * (page ))

    return <React.Fragment>
      <Grid container  spacing={8}  justify="center">        
        {productsOnPage.map((product)=>{
          return <Grid item xs={12} sm={4} key={product.id}><Product key={product.id} viewMode="summary" product={product}  /></Grid>
      })}
      </Grid>
      <Pager total={this.state.total} current={this.props.page} />
    </React.Fragment>
  }
}

export default withRouter(ProductList);
