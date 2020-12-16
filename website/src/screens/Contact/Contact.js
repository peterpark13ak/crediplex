import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ContactForm from '../../components/ContactForm'
class Contact extends Component {
  render() {
    return <div> 
              <Typography style={{color:'black'}} component="h2" variant="title" gutterBottom> 
                  Contáctenos
              </Typography>
              <ContactForm handleSubmit={this.props.handleSubmit} />    
          </div>
  }
}

export default Contact;
