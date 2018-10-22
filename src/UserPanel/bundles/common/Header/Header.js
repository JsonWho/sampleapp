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

       <HeaderLink to="/userpanel" exact={true} >Overview</HeaderLink> |
       <HeaderLink to="/userpanel/messages" exact={true} >Messages</HeaderLink> |  
       <HeaderLink to="/userpanel/offers" exact={true} >Offers</HeaderLink>

      </div>
      );
  }

}


