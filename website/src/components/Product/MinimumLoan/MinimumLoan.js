import React, { Component } from 'react';
import InfoTag from '../../InfoTag'
class MinimumLoan extends Component {
  formatMoney(amount){
    return  `$${(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
  getTitle(amount){
    if (this.props.format !== 'text'){
      return `${this.formatMoney(this.props.amount)} Min`
    }
    return `${this.formatMoney(this.props.amount)}`
  }
  render() {    
    return <InfoTag title={this.getTitle(this.props.amount)} {...this.props} >
    <div style={{padding:'20px'}}>
      El monto minimo de credito 
    </div>
</InfoTag>   
  }
}

export default MinimumLoan;
