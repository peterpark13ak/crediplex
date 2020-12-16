import React, { Component } from 'react';
import ProductCard from './ProductCard'
import ProductDetails from './ProductDetails'
class Product extends Component {
  render() {
    const {product, lender, viewMode} = this.props
    // return <div>HELLO WOLRD MAKE THIS HOW UP  PLEASE</div>
    if (viewMode === 'summary'){
      return  <ProductCard product={product} />
    }      
    else if(viewMode === 'detail'){
      return  <ProductDetails product={product} lender={lender} />
    }    
    return <div style={{color:"black"}}> viewMode "{viewMode}" is not impelmented for products</div> 
  }
}

export default Product;
