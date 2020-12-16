import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon            from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import NavigationDrawer from './NavigationDrawer'

const drawerWidth = 240; 

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    marginLeft: -12,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 0,
    padding: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth - 25,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  grow: {
    flexGrow: 1,
  }
});



class NavBar extends Component {
  state = {
    auth: true,
    isOpen: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { auth, isOpen } = this.state;
    const open = Boolean(isOpen);
    return (
      <Root>
        <div className={classes.toolbar}>
          <AppBar color="primary" position="fixed" className={classes.appBar} >
            <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenu}>
              <MenuIcon  />
            </IconButton>
              <Typography variant="headline" align='left' color="inherit" className={classes.grow}>
                Crediplex  
              </Typography>  
              </Toolbar>
          </AppBar>

          { auth && (
            <div className={classes.content}>
              <nav className={classes.drawer}>
                <NavigationDrawer
                    id="menu-appbar"
                    open={open}                      
                    onClose={this.handleClose}
                    onClick={this.handleClose}
                    style={{width:'100%'}}
                    classes={classes}
                  >
                </NavigationDrawer>
              </nav>
              {this.props.children}
            </div>
          )}          

        </div>
      </Root>
    );
  }
}

const Root = (props) =>(
  <div style = {{
    // whiteSpace:"nowrap",
    padding:'5px 10px',
    overflow:'hidden'
  }} {...props} />
)
  

export default withStyles(styles,{ withTheme: true })(NavBar);

