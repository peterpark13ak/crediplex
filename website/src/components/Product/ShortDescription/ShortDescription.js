import React, { Component } from 'react';
import terms from './paragraphs/terms.json'
import graphs from './graphs'
import ProductReadable from './ProductReadable'

class ShortDescription extends Component {
  constructor(props){
    super(props)
    let readable = new ProductReadable(props.product)
    this.TermsGraph = new graphs(terms, readable )
  }  
  render() {
    let product = this.props.product
    let terms  = this.TermsGraph.render(product.id)

    return (
      	<div style={{fontSize:'18px', color:'black'}}>
            <p>{terms}</p> 
        </div>
    )
  }
}


export default ShortDescription;
