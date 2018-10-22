import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './css/pubfront.css';
import './bundles/Listings/listings.css';
import './bundles/common/Header/header.css';
import './bundles/common/Footer/footer.css';



import theme from './Themes/RedTheme';

import MobileMenu from './bundles/common/MobileMenu/MobileMenu';

import Header from './bundles/common/Header/Header';
 
import Footer from './bundles/common/Footer/Footer';

import Home from './bundles/Home/Home';

import Listings from './bundles/Listings/Listings';

import Listing from './bundles/Listing/Listing'


import ListingDialog from './bundles/Listing/ListingDialog';

import Specials from './bundles/Specials/Specials';



const getData = () => (

    
    
{
      listings: [

      { id: 332 ,profile_id: 11, name:'Jaz Brown', desc: 'How dee do sir, I am too tee pooo teee wooo teee seeee moooo peee koooo kaaaaka babbba booooo', starting_price: 120, suburb: 'Surry Hills', age: 23, background:'Korean', bodytype:'Slim'  },
      { id: 333 ,profile_id: 12, name:'Mercy', desc: 'How dee do sir, I am Chinee too', starting_price: 130, suburb: 'Randwick', age: 22, background:'Chinese', bodytype:'Slim'  },
      { id: 334 ,profile_id: 13, name:'Jacky', desc: 'How dee do sir, I am Frnchee too', starting_price:220, suburb: 'Refern', age: 27, background:'French', bodytype:'Athletic' },
      { id: 335 ,profile_id: 14, name:'Lina', desc: 'How dee do sir, I am Greeeky too', starting_price: 170, suburb: 'Bondi', age: 20, background:'Greek', bodytype:'Voluptious'  },

      { id: 336 ,profile_id: 15, name:'Foony', desc: 'How dee do sir, I am Foony too', starting_price: 130, suburb: 'Randwick', age: 22, background:'Russian', bodytype:'Slim'  },
      { id: 337 ,profile_id: 16, name:'Goony', desc: 'How dee do sir, I am Goony too, I love carrots and celary. Yes.', starting_price:220, suburb: 'Refern', age: 27, background:'French', bodytype:'Athletic' },
      { id: 338 ,profile_id: 17, name:'Moony', desc: 'How dee do sir, I am Moony too', starting_price: 170, suburb: 'Bondi', age: 20, background:'Greek', bodytype:'Voluptious'  },

      { id: 339 ,profile_id: 18, name:'Browny', desc: 'How dee do sir, I am too tee pooo teee wooo teee seeee moooo peee koooo kaaaaka babbba booooo', starting_price: 120, suburb: 'Surry Hills', age: 23, background:'Korean', bodytype:'Slim'  },
      { id: 340 ,profile_id: 19, name:'Mercella', desc: 'How dee do sir, I am Chinee too', starting_price: 130, suburb: 'Randwick', age: 22, background:'Chinese', bodytype:'Slim'  },
      { id: 341 ,profile_id: 20, name:'Woo', desc: 'How dee do sir, I am Frnchee too', starting_price:220, suburb: 'Refern', age: 27, background:'French', bodytype:'Athletic' },
      { id: 342 ,profile_id: 21, name:'Chia', desc: 'How dee do sir, I am Greeeky too', starting_price: 170, suburb: 'Bondi', age: 20, background:'Greek', bodytype:'Voluptious'  },


      ],

      servicesByCat : [

          {
            name: 'general',
            services: [
              {name: 'Full service', id: 121},
              {name: 'Massage', id: 122},
              {name: 'GFE (Girlfriend experience)', id: 123},
            ]
          },

          {
            name: 'strippers',
            services: [
              {name: 'option 1', id: 124},
              {name: 'option 2', id: 125},
              {name: 'option 3', id: 126},
            ]
          },

      ],

      favourites: [

      { id: 332 , name:'Jaz Brown', age: 23, background:'Korean'}, { id: 337, name:'Goony', age: 27, background:'French'} , { id: 334, name:'Jacky', age: 27, background:'French'}, { id: 333, name:'Mercy', age: 22, background:'Chinese'}] 

    }

);


class PubFront extends Component {


constructor(props) {
      super(props);


      this.state = {
        listings:[], 
        servicesByCat:[], 
        favourites:[],   
        menu_open: false,
        serviceFilters: [],
        renderDialog: true,
        active_listing: {}
      }

      this.toggleDrawer = this.toggleDrawer.bind(this);
      this.toggleServiceFilters = this.toggleServiceFilters.bind(this);
      this.clearServiceFilters = this.clearServiceFilters.bind(this);
      this.favouritesCheck = this.favouritesCheck.bind(this);
      this.toggleFavourites = this.toggleFavourites.bind(this);
    }


  toggleFavourites = (favListObject) => {

    let parse_id = parseInt(favListObject.id);

    let array_copy =  this.state.favourites.slice();

    let index = null;

    let fav = array_copy.find((fav, idx) => { if(fav.id === parse_id) {index = idx; return true; }

    });

    let isFavourite =  null;

    if(index && index !== -1 || index === 0) {
        array_copy.splice(index, 1);
        isFavourite = false;
    } else {
      array_copy.push(favListObject);
      isFavourite = true;
    }

    this.setState({ favourites: array_copy });

    return isFavourite;
  }

  favouritesCheck = (id) => {

     let parsed_id = parseInt(id);

     let checkResult = this.state.favourites.find((fav) => fav.id === parsed_id);
     
     if(checkResult) {
      return true;
     } else {
      return false;
     }
  }

  toggleDrawer = (menu_state) => () => {
    this.setState({
      menu_open: menu_state,
    });
  };

  clearServiceFilters = () => {
    this.setState({serviceFilters: [] });
  }

  toggleServiceFilters = (checked, service_id) => {

    let temp_array = this.state.serviceFilters.slice(0);
    let index = temp_array.findIndex( el => el == service_id);

    if(checked) {

      temp_array.push(service_id);

    } else {

      temp_array.splice(index, 1);
    }

    this.setState({serviceFilters: temp_array});

  }




  handleDialogClose = () => {

    this.setState({ renderDialog:false, active_listing: {} });
    this.props.history.replace('/',null);
  }





 componentWillMount() {

        let data = getData();
        this.setState({ listings: data.listings, servicesByCat: data.servicesByCat, favourites: data.favourites });

  }


  componentWillUnmount() {


  }



  render() {


    const listItems = this.state.listings;
    const servicesByCat = this.state.servicesByCat;
    const menu_items = []


    return (


      <div className="App">

        <Header clearServiceFilters={this.clearServiceFilters} serviceFilters={this.state.serviceFilters} toggleServiceFilters={this.toggleServiceFilters} servicesByCat={servicesByCat} onMenuIconClick={this.toggleDrawer} />
               
    
        <Switch>
          <Route exact path="/specials"    component={Specials}/>
          <Route path="/"  render = { ({match}) => ( <Listings listings={listItems} favouritesCheck = {this.favouritesCheck} toggleFavourites = {this.toggleFavourites} openListingInDialog={this.openListingInDialog} {...match} /> ) } />
          <Route exact path="/eroticmassage"    component={Listings}/>
        </Switch>

        <Route exact path="/listing/:id/:name?"    render = { ({match}) => ( <ListingDialog toggleFavourites={this.toggleFavourites} favouritesCheck = {this.favouritesCheck} listing_name={match.params.name} listing_id={match.params.id} handleDialogClose={this.handleDialogClose} renderDialog={true} /> ) } />


        <Footer toggleFavourites={this.toggleFavourites} favourites={this.state.favourites} />


        <MobileMenu toggleLoginState={this.props.toggleLoginState} isAuthenticated={this.props.isAuthenticated} menu_open={this.state.menu_open} toggleDrawer={this.toggleDrawer} />


      </div>
    );
  }
}

export default PubFront;

