import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';


import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { withStyles } from '@material-ui/core/styles';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import LoginOutSwitch from '../../Login/LoginOutSwitch'



const styles = {
  root: {
    width: '100%',
    width: 240,
    backgroundColor: '#cc2000'
  },

  nested: {
    paddingLeft: 14,
  },

  flex: {
  	flex: 1
  }
}




class MobileMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = { 

			cat_tab_open: true 
		}



		this.toggleCatTab = this.toggleCatTab.bind(this);


	}


	toggleCatTab = () => {

	   this.setState({ cat_tab_open: !this.state.cat_tab_open });
	};


	   render() {

	   const { classes } = this.props;


     const ManagerLlink = this.props.isAuthenticated ?                  

                (<Link to="/manager">
                  <ListItem button>
                     <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    Manager
                  </ListItem>
                  </Link>) : null

       return (
        <Drawer anchor="right" open={this.props.menu_open} onClose={this.props.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.props.toggleDrawer(false)}
          >


		     <AppBar position="static">
		        <Toolbar>
				     <IconButton onClick={this.props.toggleDrawer(false)} aria-label="Cancel">
				        <CancelIcon />
				      </IconButton>

				           <Typography variant="title" color="inherit" className={classes.flex}>
          					</Typography>


                <LoginOutSwitch toggleLoginState={this.props.toggleLoginState} isAuthenticated={this.props.isAuthenticated} />

		            
          </Toolbar>
		      </AppBar>
		                      <Divider />


          	  <div className={classes.root}>
                <List component="nav">

                <Link to="/specials">
                  <ListItem button>
                     <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    Specials
                  </ListItem>
               </Link>


		          <ListItem button onClick={this.toggleCatTab}>
		            <ListItemIcon>
		              <InboxIcon />
		            </ListItemIcon>
		            <span>Categories</span>
		          {this.state.cat_tab_open ? <ExpandLess /> : <ExpandMore />}
		          </ListItem>

		         <Collapse in={this.state.cat_tab_open} timeout="auto" unmountOnExit>
		            <List component="div" disablePadding>
		              <ListItem button className={classes.nested}>
	
		                <ListItemText inset primary="Starred" />
		              </ListItem>
		            </List>
		          </Collapse>                
          </List>


                <Divider />
                <List component="nav">

                  <ListItem button>
                     <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <Link to="/specials">Specials</Link>
                  </ListItem>


 
                {ManagerLlink}

                </List>
              </div>




          </div>
        </Drawer> 
        );

	}


}



export default withStyles(styles)(MobileMenu);