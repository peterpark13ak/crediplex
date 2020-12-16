import React, { Component } from 'react';
import InfoTag from '../../InfoTag'
class LoanTerm extends Component {
  render() {
    return <InfoTag title={`De ${this.props.start} a ${this.props.end} ${this.props.units}`} {...this.props}>
              <div style={{padding:'20px'}}>
                El plazo del prestamo puede ser entre {this.props.start} y {this.props.end} {this.props.units}
              </div>
          </InfoTag>             
    ;
  }
}

export default LoanTerm;
