import React, { Component } from 'react';
import {TextField, MenuItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormSelect from '../../components/FormSelect'
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import term_data from '../../data/loan_terms.js'
import coverage_areas from '../../data/coverage_areas.js'
import {withRouter } from 'react-router-dom'
import * as yup from 'yup'

class SearchForm extends Component {
  locale = yup.setLocale({
    mixed:{
      required:'Campo obligatorio',
      number:'Por favor, ingrese un número positivo',
      positive:'Por favor, ingrese un número positivo',
    },
    number:{
      positive:'Por favor, ingrese un número positivo',  

    }
  })
  schema = yup.object().shape({    
    amount: yup
    .string()
    .matches(/^\d+(?:[.|,]\d{0,2})?$/,'Utilice sólo dos decimales')
    .matches(/^\d+(?:[.|,]\d*)?$/,'Por favor, ingrese un número positivo')
    .required()
    .typeError('Por favor, ingrese un número positivo'),
    state: yup.string().required(),
    term: yup.string().required(),
    monthly_income: yup
      .string()
      .matches(/^\d+(?:[.|,]\d{0,2})?$/,'Utilice sólo dos decimales')
      .matches(/^\d+(?:[.|,]\d*)?$/,'Por favor, ingrese un número positivo')
      .required()
      .typeError('Por favor, ingrese un número positivo'),
  });  
  state = {
    errors:{},
    data:{}
  };    

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let data = Object.assign({},this.state.data)
    data[name] = value
    this.setState({
      data:data
    });

    this.validateField(data, name) 
  }
  handleSubmit(){
    let data = this.state.data
    let errors = this.validateAll(data)

    if(Object.keys(errors).length === 0 && errors.constructor === Object){
      this.props.handleSearch(data)
      this.props.history.push('/resultados')
    }      
  }
  validateField(data, name){
    let errorState = Object.assign({}, this.state.errors)
    let errorsFound= this.getErrors(data)
    // If error exist in field currently add to state
    if(errorsFound.hasOwnProperty(name)){
      errorState[name] = errorsFound[name]
    }
    // If Error does not exist in field, clear any error from state
    else{
      delete errorState[name]
    }
    this.setState({
      errors:errorState     
    })    
  }

  validateAll(data){
    let errors = this.getErrors(data)
    this.setState({
      errors:errors      
    })  
    return errors 
        
  }
  getErrors(data){
    try{
      this.schema.validateSync(data,{ abortEarly: false })
      // on success return empty error object
      return {} 
    }
    catch(e){
      // If there is an error set errors in the state
      let errors = {}
      // loop through all errors found
      for (let err of e.inner){
        errors[err.path] = err
      }        
      return errors
    }    
  }
  hasError(fieldName){    
    return this.state.errors.hasOwnProperty(fieldName)
  }
  getErrorMessage(fieldName){    
    if(this.hasError(fieldName) ){      
      return this.state.errors[fieldName].message
    }
    return false
  }

  render() {
    const open = this.state.errors !== null && Object.keys(this.state.errors).length !== 0  ? true : false;

    return <div style={{color:'black'}}>
      <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }}
              open={open}                
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Corrija la información introducida en el formulario</span>}/>

      <List>
        <ListItem >
          <TextField  name="amount" 
                      placeholder="Monto del Crédito"  
                      onChange={this.handleInputChange} 
                      helperText= {this.getErrorMessage('amount')}
                      error={this.hasError('amount')} />
        </ListItem>
      </List>
      <List>
        <ListItem >
          <FormSelect onChange={this.handleInputChange} 
                      value={this.state.data.term || -1} 
                      name="term"
                      helperText= {this.getErrorMessage('term')}
                      error={this.hasError('term')} >
            <MenuItem value={-1}>
              <em>Seleccione la Duración </em>
            </MenuItem>

            { term_data.map(term => (
              <MenuItem key={term.id} value={term.id}>{term.name}</MenuItem>
                ))}
          </FormSelect>
        </ListItem>
        <List>
        <ListItem >
        
        <FormSelect onChange={this.handleInputChange} 
                value={this.state.data.state || -1} 
                name="state"
                helperText= {this.getErrorMessage('state')}
                error={this.hasError('state')} >
              <MenuItem value={-1}>
                <em>Seleccione el Estado</em>
              </MenuItem>              
              { 
             coverage_areas.map(state =>(
                  <MenuItem key={state.name} value={state.name}> {state.name || 'No State' }</MenuItem>
                ))          
                }
        </FormSelect>            
        </ListItem>
      </List>
      <List>
        <ListItem >
          <TextField  name="monthly_income"  
                      placeholder="Ingreso Mensual"  
                      onChange={this.handleInputChange} 
                      helperText= {this.getErrorMessage('monthly_income')}
                      error={this.hasError('monthly_income')}/>
        </ListItem>
      </List>
      <List>
        <ListItem >
        <Button  color='primary' type='button' onClick={this.handleSubmit}>Submit</Button>
        </ListItem>
      </List>
              
      </List>
      
    </div>;
  }
}

export default withRouter(SearchForm);
