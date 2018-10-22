import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';




const HeaderLink = ({ children, to, exact }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    
      <Link className={match ? 'active' : ''} to={to}>
        {children}
      </Link>
    
  )}/>
);



export default class Header extends Component { 


render() {

		return (
      <div className="header">

       <HeaderLink to="/Admin" exact={true} >Overview</HeaderLink> |
       <HeaderLink to="/Admin/ads" exact={true} >Ads</HeaderLink> |  
       <HeaderLink to="/Admin/profiles" exact={true} >Profiles</HeaderLink> |
       <HeaderLink to="/Admin/locations" exact={true} >Locations</HeaderLink> |
       <HeaderLink to="/Admin/console" exact={true} >Console</HeaderLink>

      </div>
      );
  }

}


