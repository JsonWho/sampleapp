import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import NewAdWizard from './bundles/NewAdWizard/NewAdWizard';
import Dashboard from './bundles/Dashboard/Dashboard';




const getData = () => (

    
    
    {
          profiles: [
          { id: 11, name:'Jaz Brown', suburb: 'Surry Hills', age: 23, background:'Korean'  },
          { id: 12, name:'Mercy', suburb: 'Randwick', age: 22, background:'Chinese' },
          { id: 13, name:'Jacky', suburb: 'Refern', age: 27, background:'French'}, 
          { id: 113, name:'Jaz Brown', suburb: 'Surry Hills', age: 23, background:'Korean'  },
          { id: 1233, name:'Mercy', suburb: 'Randwick', age: 22, background:'Chinese' },
          { id: 103, name:'Jacky', suburb: 'Refern', age: 27, background:'French'}, 
          { id: 119, name:'Jaz Brown', suburb: 'Surry Hills', age: 23, background:'Korean'  },
          { id: 123, name:'Mercy', suburb: 'Randwick', age: 22, background:'Chinese' },
          { id: 133, name:'Jacky', suburb: 'Refern', age: 27, background:'French'}, 
          { id: 161, name:'Jaz Brown', suburb: 'Surry Hills', age: 23, background:'Korean'  },
          { id: 162, name:'Mercy', suburb: 'Randwick', age: 22, background:'Chinese' },
          { id: 163, name:'Jacky', suburb: 'Refern', age: 27, background:'French'}, 
          { id: 111, name:'Jaz Brown', suburb: 'Surry Hills', age: 23, background:'Korean'  },
          { id: 112, name:'Mercy', suburb: 'Randwick', age: 22, background:'Chinese' },
          { id: 118, name:'Jacky', suburb: 'Refern', age: 27, background:'French'}, 
          ],

          locations: [
          {id:888, name: 'Mistys', suburb: 'Newtown', street: 'King', streetNo: '343'},
          {id:889, name: '69A Botany St', suburb: 'Roseberry', street: 'Botany', streetNo: '69A' },
          ],

          categories: [
            {id:700, name: 'General'},
            {id:701, name: 'For women'},
            {id:702, name: 'For Gay/Bi men'},
            {id:703, name: 'Other'},
          ]

    }

)


class Manager extends React.Component {

  constructor() {
  super();

  this.state = {
  }

  }


    componentDidMount() {

      this.setState({data: getData()});

    }



  render() {




    return (


        <Switch>

        <Route path="/manager"  render={(props) => <Dashboard data={this.state.data} {...props} /> }/>

        <Route path="/newadwizard"  render={(props) => <NewAdWizard data={this.state.data} {...props} />  }/>


        </Switch>

    );
  }
}


export default Manager;