import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownCircle from '@material-ui/icons/ArrowDropDownCircle';

import './footer.css';



class Footer extends React.Component {

constructor() {
	super();

	this.state = {

		footerUp: false
	}


}


toggleFooter = () => {

   this.setState({footerUp: this.state.footerUp ? false : true });

 }


 deleteFav = (fav) => event => {

 	event.preventDefault();

 	this.props.toggleFavourites(fav);

}


	render() {

		const favCount = this.state.favCount;

		const favourites = this.props.favourites;

		const noFavMessage = favourites.length === 0 ? <div style={{marginTop: '20%'}}>You have no favourites</div> : null;

		const activeFavIcon = this.state.footerUp ? <ArrowDropDownCircle style={{marginBottom:'-5px'}}  /> : <StarIcon style={{marginBottom:'-5px'}}  />;

		const favList = favourites.map((fav) => 


			<Link key={fav.id} to={'/listing/' + fav.id + '/' + fav.name}>

			<div className="favrow">
				<div>{fav.name}</div>
				<div>{fav.age}</div>
				<div>{fav.background}</div>
				<div><CloseIcon onClick={this.deleteFav(fav)}  /></div>
			</div>

			</Link>





			);


		return(	
			 <div className={"footer " + (this.state.footerUp ? 'raise' : '')}>


			 <Grid container style={{height: '50px'}} justify="space-between" alignItems="center">

					 <Grid item xs={6}></Grid>

					 <Grid item xs={6}><div onClick={this.toggleFooter} className="fav" ><span>Favourites: </span><span> {favourites.length} </span>{activeFavIcon}</div></Grid>

			 </Grid>
			<div className="favLinesWrapper">

			 	{favList}
				{noFavMessage}

			 </div>


			 </div>
		 );


	}

}


export default Footer;
