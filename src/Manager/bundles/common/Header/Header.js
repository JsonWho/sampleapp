import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


// const HeaderLink = ({ children, to, exact }) => (
//   <Route path={to} exact={exact} children={({ match }) => (
    
//       <Link className={match ? 'active' : ''} to={to}>
//         {children}
//       </Link>
    
//   )}/>
// );



// export default class Header extends Component { 


// render() {

// 		return (
//       <div className="header">

//        <HeaderLink to="/manager" exact={true} >Overview</HeaderLink> |
//        <HeaderLink to="/manager/ads" exact={true} >Ads</HeaderLink> |  
//        <HeaderLink to="/manager/profiles" exact={true} >Profiles</HeaderLink> |
//        <HeaderLink to="/manager/locations" exact={true} >Locations</HeaderLink> |
//        <HeaderLink to="/manager/console" exact={true} >Console</HeaderLink>

//       </div>
//       );
//   }

// }

const drawerWidth = 240;

const styles = theme => ({

  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    width:`calc(100% - ${drawerWidth}px)` }
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    // }
  
});


class Header extends React.Component {

constructor() {
super();

}


testFunc = () => {

}


  render() {



    const {classes} = this.props;

    return (
    <div className={classes.root}>

      <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.testFunc}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              OzAdult > Manager
            </Typography>
          </Toolbar>
        </AppBar>

</div>

        );


}


      }


export default withStyles(styles)(Header);