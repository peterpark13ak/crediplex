import React, { Component } from 'react';
import {FormHelperText, Select} from '@material-ui/core'
class FormSelect extends Component {
  render() {
    const {helperText, error, ...selectProps } = this.props
    return <div>
      <Select {...selectProps} error={error}>          
          {this.props.children}
      </Select>
      <FormHelperText error={error} >{helperText}</FormHelperText>
  </div>
  }
}

export default FormSelect;
