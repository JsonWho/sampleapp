import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';


import Header from './bundles/common/Header/Header';
 
import Footer from './bundles/common/Footer/Footer';

import Overview from './bundles/Overview/Overview';
import Messages from './bundles/Messages/Messages';
import Offers from './bundles/Offers/Offers';







class MyAccount extends Component {


constructor(props) {
      super(props);

    }




  render() {

    return (

      <div className="App">

      	<Header />

      	<Switch>

        <Route exact path="/userpanel"  component={Overview}/>

      	<Route exact path="/userpanel/messages"  component={Messages}/>
        <Route exact path="/userpanel/offers"  component={Offers}/>
    

      	</Switch>

      	<Footer />


      </div>

    );
  }
}


export default MyAccount;