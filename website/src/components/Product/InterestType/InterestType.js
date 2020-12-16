import React, { Component } from 'react';
import InfoTag from '../../InfoTag'
class InterestType extends Component {
  render() {
    return <InfoTag title={`Interes ${this.props.interest_type}`} >
    <div style={{padding:'20px'}}>
      Interest rates can be variable of fixed.  
      The interest rate in this loan product is:{this.props.interest_type}
    </div>
</InfoTag>   
  }
}

export default InterestType;
