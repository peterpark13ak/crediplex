import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';
import AppIcon from '@material-ui/icons/Apps';

// import ListIcon from '@material-ui/icons/List';
// import InfoIcon from '@material-ui/icons/InfoOutlined';
// import FavoriteIcon from '@material-ui/icons/StarBorderRounded';
// import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
// import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

const content = (
  <div>
  <div style={{height:'30px',backgroundColor:'#CCC',width:'300px'}}></div> 
  <List component="nav">
  <Link to="/home" style={{textDecoration: 'none'}}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItem>        
    </Link>  

    {/* <ListItem button>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Iniciar sesión" />          
    </ListItem> 
    <ListItem button>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Registrarse" />          
    </ListItem>*/}
    <Divider />      
    <Link to="/buscar" style={{textDecoration: 'none'}}>
      <ListItem button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Buscar" />
      </ListItem>        
    </Link>  
    {/*
    <ListItem button>
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Creditos Preferidos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Directorio" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Quiénes Somos" />
    </ListItem> */}
  <Divider />      
    <Link to="/contactar" style={{textDecoration: 'none'}}>
      <ListItem button>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Contactar" />
      </ListItem>        
    </Link> 
    <Divider />      
    <Link to="/prestamos" style={{textDecoration: 'none'}}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Directorio" />
      </ListItem>        
    </Link> 
    <Divider />      
    <Link to="/financieras" style={{textDecoration: 'none'}}>
      <ListItem button>
        <ListItemIcon>
          <AppIcon />
        </ListItemIcon>
        <ListItemText primary="Entidades Financieras" />
      </ListItem>        
    </Link> 
  </List>
  </div>)
class NavigationDrawer extends Component {
  
  render() {
    const { classes, ...pass_props } = this.props;
    return  <div style={{ border:'0px solid black'}}> 
   <Hidden smUp implementation="css">
    <Drawer {...pass_props} >
      {content}
    
    </Drawer>
  </Hidden>
  <Hidden xsDown implementation="css">
            <Drawer
              {...pass_props}

              classes={{
                paper: classes.drawerPaper,                
              }}
              variant="permanent"
              open
            >
            {content}
        </Drawer>
    </Hidden>
  </div>;
  }
}

export default NavigationDrawer;
