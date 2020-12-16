import React, { Component } from 'react';
import intro from './paragraphs/intro.json';
import terms from './paragraphs/terms.json'
import reqs from './paragraphs/requirements.json'
import benefits from './paragraphs/benefits.json'
import graphs from './graphs'
import ProductReadable from './ProductReadable'

class LongDescription extends Component {
  constructor(props){
    super(props)
    let readable = new ProductReadable(props.product)
    this.IntroGraph = new graphs(intro, readable )
    this.TermsGraph = new graphs(terms, readable )
    this.ReqsGraph = new graphs(reqs, readable )
    this.BenefitsGraph = new graphs(benefits, readable )

  }  
  render() {
    let product = this.props.product
    // console.log(product) 

    let intro  = this.IntroGraph.render(product.id)
    let terms  = this.TermsGraph.render(product.id)
    let reqs  = this.ReqsGraph.render(product.id)
    let benefits  = this.BenefitsGraph.render(product.id)
      return <div style={{fontSize:'18px', color:'black'}}>
          <h3>Descripción</h3>
          <p>{intro}</p> 
          <p>{terms}</p>
          <h3>Requisitos</h3>
          <p dangerouslySetInnerHTML={{__html:reqs}}></p>
          <h3>Ventajas y Desventajas</h3>
          <p dangerouslySetInnerHTML={{__html:benefits}}></p>             
          </div>;
  }
}


export default LongDescription;
