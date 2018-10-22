import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Headroom from 'react-headroom';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


import FilterDialog from './FilterDialog'
import AutoSuggest from './AutoSuggest';


const HeaderLink = ({ children, to, exact }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    
      <Link className={match ? 'active' : ''} to={to}>
        {children}
      </Link>
    
  )}/>
);




const styles = {

      MuiInput: { 


          root: {

             },

             input: {
                  
                  borderRadius:2

                },

          underline: {

             '&:after': {
                display:'none'
             },
             '&:hover:not($disabled):after': {
                display:'none'
             },
             '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom:'none'
             },

             '&:before': {
                borderBottom:'none'
             }


          },

    }
}



class Header extends Component { 

constructor(props) {
  super(props);


  this.state = {
    distance: 5,
    selected_category: 'General',
    showFilterDialog: false,
    checkboxData: []
  }

  this.toggleFilterDialog = this.toggleFilterDialog.bind(this);
  this.getServicesForCategory = this.getServicesForCategory.bind(this);
  this.toggleFilterCheckbox = this.toggleFilterCheckbox.bind(this);
  this.handleCatChange = this.handleCatChange.bind(this);
}




componentWillMount() {

    this.getServicesForCategory();
}

      toggleFilterDialog = () => {
        this.setState({ showFilterDialog: !this.state.showFilterDialog });
      }




      toggleFilterCheckbox = index => event => {

          let array_copy = this.state.checkboxData.slice();
          let checkbox = array_copy[index];
          let checked = checkbox.checked;

          checkbox.checked = checked ? false : true;

          this.setState({checkboxData: array_copy});

          this.props.toggleServiceFilters(!checked, checkbox.id );

      }



      handleCatChange = event => {
        this.setState({ selected_category: event.target.value }, this.getServicesForCategory);
        
        this.props.clearServiceFilters();
      };



      getServicesForCategory = () => {
        let servicesByCat = this.props.servicesByCat;
        let selected_category = this.state.selected_category;

        const activeCat = servicesByCat.find(cat => cat.name.toLowerCase() == selected_category.toLowerCase()); 

            let results = [];

            if(activeCat && activeCat.services) {

              results =  activeCat.services.map(sv => { 

                return {name: sv.name, id: sv.id, checked: false }; 

              });

            }


              this.setState({checkboxData: results });

        }




    render() {

      const {classes} = this.props;


    		return (
          <div>
          <Headroom disableInlineStyles>
          <div id="header_wrapper">
          <div id="top_header" className="top_header">
          <Grid container>
            <Grid xs={9} alignItems="center" justify="flex-start" container item>
              <Grid  item className="brand"><Link to="/">OzAdult</Link> &#62;</Grid>
              <Grid  item>
                        <FormControl>
                          <Select  className="cat_select_control"
                            value={this.state.selected_category}
                            onChange={this.handleCatChange}
                            displayEmpty
                            disableUnderline={true}
                            name="selected_category">

                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Gay">Gay</MenuItem>
                            <MenuItem value="Strippers">Strippers</MenuItem>
                            <MenuItem value="Adult Jobs">Adult Jobs</MenuItem>
                          </Select>
                        </FormControl>

              </Grid>
            </Grid>
            <Grid xs={3} alignItems="center" container justify="flex-end" item className="menu_button_container">         
                <IconButton onClick={this.props.onMenuIconClick(true)} color="secondary" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
              </Grid>
          </Grid>
          </div>

          <div id="sticky_header" className="sticky_header">

          <div className="search_cell">
             <AutoSuggest />

                 <form autoComplete="off" >
                       <FormControl>
                        <Select
                          value={this.state.distance}
                          onChange={this.handleChange}
                          displayEmpty
                          input={<Input disableUnderline={true} name="distance" id="distance_select" />}
                        >

                          <MenuItem value={5}>+5km</MenuItem>
                          <MenuItem value={10}>+10km</MenuItem>
                          <MenuItem value={20}>+20km</MenuItem>
                          <MenuItem value={50}>+50km</MenuItem>
                          <MenuItem value={100}>+100km</MenuItem>
                          <MenuItem value={250}>+250km</MenuItem>

                        </Select>
                      </FormControl>
                  </form>


                  <Button className="search_button" variant="raised">
                     <SearchIcon />
                  </Button>
            </div>

            <div className="advanced_button_container">
                  <Button disableFocusRipple={true} variant="outlined" onClick={this.toggleFilterDialog} className="advanced_button">
                   {this.props.serviceFilters.length > 0 ? ('Active Filters ' + this.props.serviceFilters.length) : 'Advanced Search'}
                  </Button>
            </div>

           </div> 
      </div>
      </Headroom>

      <FilterDialog checkboxData={this.state.checkboxData} toggleFilterDialog={this.toggleFilterDialog} toggleFilterCheckbox={this.toggleFilterCheckbox} showFilterDialog={this.state.showFilterDialog} />

      </div>
      );
  }

}

export default withStyles(styles)(Header); 

