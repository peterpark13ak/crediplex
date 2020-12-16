import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class ContactReceived extends Component {
  render() {
    return <div style={{height:'100%'}}> 
     <List>
       <ListItem>
         <Typography style={{color:'black'}} component="h2" variant="title" gutterBottom> 
          Gracias por Contactarnos
        </Typography>
      </ListItem>
    </List>
    <List>
       <ListItem>
         <Typography style={{color:'black'}}> 
          Hemos recibido su mensaje y nos pondremos en contacto en breve. También recibirá un correo electrónico de confirmación y luego nuestra respuesta.
        </Typography>
      </ListItem>
    </List>
    
    
   
  </div>
  }
}
 
export default ContactReceived;
