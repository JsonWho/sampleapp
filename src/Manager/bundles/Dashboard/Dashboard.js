



import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import FaceIcon from '@material-ui/icons/Face';
import StoreIcon from '@material-ui/icons/Store';
import ChatIcon from '@material-ui/icons/Chat';
import DashBoardIcon from '@material-ui/icons/Dashboard';


import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';


import Overview from '../../bundles/Overview/Overview';
import { Route, Link, Switch } from 'react-router-dom';

import Ads from '../../bundles/Ads/Ads';
import Profiles from '../../bundles/Profiles/Profiles';
import Locations from '../../bundles/Locations/Locations';
import Console from '../../bundles/Console/Console';





const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
            backgroundColor: '#cc2000',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  list: {
    '& a:link' : {
      color:'#fff'
    }
  },

  newAdButton: {

    margin: '0 auto',
    border: '1px solid white',
    borderRadius: '4px',
    padding: '10px 0px 10px',
    fontWeight:'bold',

    '& a:visited' : {
      color:'#fff'
    },

    '& a' : {
      padding:'10px'
    },

    '&:hover' : {

      backgroundColor: 'rgba(0,0,0,0.15)'
    }

  }
});

class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const topLinks = (

              <List component="nav">

                <Link to="/manager">
                  <ListItem button>
                     <ListItemIcon>
                      <DashBoardIcon />
                    </ListItemIcon>
                    Overview
                  </ListItem>
                  </Link>

                <Link to="/manager/ads">
                  <ListItem button>
                     <ListItemIcon>
                      <ViewStreamIcon />
                    </ListItemIcon>
                    My Ads
                  </ListItem>
                </Link>


               <Link to="/manager/profiles">
                  <ListItem button>
                     <ListItemIcon>
                      <FaceIcon />
                    </ListItemIcon>
                    Profiles
                  </ListItem>
                </Link>


               <Link to="/manager/locations">
                  <ListItem button>
                     <ListItemIcon>
                      <StoreIcon />
                    </ListItemIcon>
                    Locations
                  </ListItem>
                </Link>


              <Link to="/manager/console">
                  <ListItem button>
                     <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    Console
                  </ListItem>
                </Link>



        
          </List>
);


    const drawer = (
      <div className={classes.list} >
        <div className={classes.toolbar}>

                <Link to="/accountdetails">
                  <ListItem style={{paddingTop: '20px', paddingBottom: '20px'}} button>
                     <ListItemIcon>
                      <AssignmentIndIcon />
                    </ListItemIcon>
                    Account Details
                  </ListItem>
                  </Link>

        </div>
        <Divider />
        <List>{topLinks}</List>
        <Divider />

        <List>

                  <ListItem>

                          <div className={classes.newAdButton}>
                            <Link to="/newadwizard">
                            New Ad                          
                            </Link>
                          </div>

                  </ListItem>


        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              OzAdult &gt; Manager
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,

            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>


        <div className="App">

        <Route exact path="/manager"  component={Overview}/>

        <Route exact path="/manager/ads"  component={Ads}/>
        <Route exact path="/manager/profiles"  component={Profiles}/>
        <Route exact path="/manager/locations"  component={Locations}/>
        <Route exact path="/manager/console"  component={Console}/>


        </div>


        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);