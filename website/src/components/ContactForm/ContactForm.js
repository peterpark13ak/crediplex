import React, { Component } from 'react';
import {TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import {withRouter } from 'react-router-dom'
import * as yup from 'yup'

class ContactForm extends Component {
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
    name: yup
    .string()
    .required(),
    email: yup.string()
      .email('Por favor, su correo electrónico')
      .required(),
    subject: yup.string().required(),
    message: yup.string().required(),
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
      this.props.handleSubmit(data)
      this.props.history.push('/mensaje-recibida')
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
    const open = false //this.state.errors !== null && Object.keys(this.state.errors).length !== 0  ? true : false;
    return <div style={{color:'black'}}>
    <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={open}                
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Corrija la información introducida en el formulario</span>}/>

    <List>
      <ListItem >
        <TextField  name="name" 
                    placeholder="Nombre"  
                    onChange={this.handleInputChange} 
                    helperText= {this.getErrorMessage('name')}
                    error={this.hasError('name')} />
      </ListItem>
    </List>
    <List>
      <ListItem >
        <TextField  name="email"  
                    placeholder="Correo Electrónico" 
                    onChange={this.handleInputChange} 
                    helperText= {this.getErrorMessage('email')}
                    error={this.hasError('email')}/>
      </ListItem>
    </List>
    <List>
      <ListItem >
        <TextField  name="subject"  
                    placeholder="Asunto" 
                    onChange={this.handleInputChange} 
                    helperText= {this.getErrorMessage('subject')}
                    error={this.hasError('subject')}/>
      </ListItem>
    </List>
    <List>
      <ListItem >
        <TextField  name="message"  
                    placeholder="Mensaje"
                    multiline={true}
                    rows={4}
                    rowsMax={4} 
                    onChange={this.handleInputChange} 
                    helperText= {this.getErrorMessage('subject')}
                    error={this.hasError('subject')}/>
      </ListItem>
    </List>

    <List>
      <ListItem >
      <Button  color='primary' type='button' onClick={this.handleSubmit}>Submit</Button>
      </ListItem>
    </List>

  </div>;
  }
}

export default withRouter(ContactForm);
