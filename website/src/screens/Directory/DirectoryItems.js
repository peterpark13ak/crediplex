import React, { Component } from 'react';
import ProductList from '../ProductList'
import {withRouter } from 'react-router-dom'
import client from '../../utils/client'
import {Helmet} from "react-helmet";

class Directory extends Component {
    _isMounted = false
  state= {
    products:[],
    page:3   
  }
  constructor(props){
      super(props)
      this.loadData = this.loadData.bind(this)
      this.state.page = this.props.match.params.page
  }
  async loadData(estado){
    try{
      let products = await client.getProductsForArea(estado)
      if(this._isMounted){        
          this.setState({products:products.data})    
      }  
    }
    catch(e){
      console.log(e)
    }
        
}
  async componentDidMount(){
    this._isMounted = true;
    let estado = this.props.match.params.estado
    estado = estado.replace(/-/g, ' ').toLowerCase();
    await this.loadData(estado)  
  }
  componentWillUnmount(){
      this._isMounted = false;
  }
  componentWillReceiveProps(nextprops){
      this.setState({page:nextprops.match.params.page})
  }


  render() {       
      return <div>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Crediplex - Directorio de Préstamos en México</title>
            <link rel="canonical" href={`http://crediplex.io${this.props.history.location.pathname}`} />
            <meta name="description" content={`Prestamos disponible en el estado de ${this.props.match.params.estado}`} />
          </Helmet>          
          
        <ProductList products={this.state.products} page={this.state.page} pageSize={10} />
      </div>
      
  }
}

export default withRouter(Directory);
