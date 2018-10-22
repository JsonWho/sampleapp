import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import AppBar from './AppBar';
import Listing from './Listing';
import DialogBar from '../../../UIcomponents/DialogBar';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';



const styles = {
  root: {
    padding: 0,
    paddingTop:40
  },

}



class ListingDialog extends Component { 

constructor(props) {
  super(props);


this.dispatchEvent = this.dispatchEvent.bind(this);
}


dispatchEvent = () => {

	//may need to check if images loses before tigegering this event, maybe do it from listing class

	window.dispatchEvent(new Event('resize'));
}


componentDidMount() {


      }


 render() {


 	const {classes} = this.props;

 	return(

 		
			<Dialog
			fullScreen={true}
			open={this.props.renderDialog}
			onClose={this.props.handleDialogClose}
			onEntered={this.dispatchEvent}
			aria-labelledby="responsive-dialog-title"
			>
			
			<DialogBar title={this.props.listing_name} handleDialogClose={this.props.handleDialogClose} />

			<DialogContent className={classes.root}>
			 	
			<Listing toggleFavourites={this.props.toggleFavourites} favouritesCheck={this.props.favouritesCheck} listing_id={this.props.listing_id} listing_name={this.props.listing_name} />

			</DialogContent>
			<DialogActions>
			<Button onClick={this.props.handleDialogClose} color="primary">
			Disagree
			</Button>
			<Button onClick={this.props.handleDialogClose} color="primary" autoFocus>
			Agree
			</Button>
			</DialogActions>
			</Dialog>


 		);
 }
}


export default withStyles(styles)(ListingDialog);