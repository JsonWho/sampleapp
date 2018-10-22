import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';


import Header from './bundles/common/Header/Header';
 
import Footer from './bundles/common/Footer/Footer';

import Overview from './bundles/Overview/Overview';

import Ads from './bundles/Ads/Ads';
import Profiles from './bundles/Profiles/Profiles';
import Locations from './bundles/Locations/Locations';
import Console from './bundles/Console/Console';







class Admin extends Component {


constructor(props) {
      super(props);

    }




  render() {

    return (

      <div className="App">

      	<Header />

      	<Switch>

        <Route exact path="/Admin"  component={Overview}/>

      	<Route exact path="/Admin/ads"  component={Ads}/>
        <Route exact path="/Admin/profiles"  component={Profiles}/>
        <Route exact path="/Admin/locations"  component={Locations}/>
        <Route exact path="/Admin/console"  component={Console}/>


      	</Switch>

      	<Footer />


      </div>

    );
  }
}


export default Admin;