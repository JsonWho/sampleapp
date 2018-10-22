import React, { Component, Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './listing.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import CallIcon from '@material-ui/icons/Call';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';



	const getListingData = () => (

		{
			//this is the listing object
			id: 501,
			//this is a worker profile. Must implement venue, job_provider objects and respective listing views.
			type:'profile',
				//this is the relevant profile object the listing references.
				profile: {
				id: 601,
				name: 'Angelique Rogue',
				age: 22,
				background:'Asian(Other)',
				bodytype: 'Voluptuous',
				height: 168,
				//travel range calculated from profile.location to user inputed suburb
				outcall_travel_range:20,
				//when a listing meets criteria on outcall travel range only, display 'outcall' insteaf of suburb name in search results (listings) view.
				service_tags: ['GFE','Massage'],
				keywords: [],
				description: '<p>Hello I am Chappy</p><p>fsfsdjfsjdflfsd jflksnv,cnv,nvncv fmds.fsdfsd klkfsdkkfds f. fslj. jksdfklsd jdsflk jklsdj f fsdf coom sd fsfsdf fsdfdssdffsd sjl jjlsf jfdslaj lsjlkf jdja f fsfsadfsd </p><p>fsfsdjfsjdfsdfsd fsfdsdsfds fljksdfklsd jdsflk jklsdj fsjl jjlsf jfdslajb booom like lsjlkf jdja f cooom zoom fsfsadfsd </p><p>fsfsdjfsjdfljksdfklsd rooomy booomy jdsflk jklsdj fsjl jjlsf jfdslaj lsjlkf jdja f fsfsadfsd </p><p>fsfsdjfsjdfljksdfklsd la la loopsy pooopsy jdsflk jklsdj fsjl jjlsf jfdslaj lsjlkf jdja f fsfsadfsd </p><p>fsfsdjfsjdf fooking dooking ljksdfklsd jdsflk jklsdj fsjl jjlsf jfdslaj lsjlkf jdja f fsfsadfsd </p><p>fsfsdjfsjdfljksdfklsd jdsflk jklsdj fsjl jjlsf jfdslaj lsjlkf jdja f fsfsadfsd </p><p>fsfsdjfsjdfljksdfklsd jdsflk jklsdj fsjl jjlsf jfdslaj lsjlkf jdja f fsfsadfsd </p><p>fsfsdjfsjdfljk like so many sdfklsd jdsflk jklsdj fsjl jjlsf jfdslaj boom  lsjlkf jdja ponty fooom f fsfsadfsd </p><ul><li>item 1</li><li>item 2</li><li>item 3</li></ul><p>fsfsdjfsjdfljksdfklsd jdsflk jklsdj never knew pegeon could fsjl jjlsf jfdslaj lsjlkf jdja f fsfsadfsd </p>',
				images: []
				},

			date_listed: '22/02/2018',
			location: 'Ashfield',
			contact_no:'0432 345 434',
			service_delivery_mothods: ['Incall','Outcall'],
			offers_accepted: true,
			starting_price: 130

		}
	);




const styles = 

{


		favStar: { 

			fontSize: 30,

			color: '#9a9a9a',
		
			'&:hover': {

				color:'#ccc'
			},

			cursor: 'pointer',

			padding: '10px 0px 10px 0px'

		},

		modal: {

			top: '35%',
			margin: '0 auto',
		},

		paper: {
		    position: 'absolute',
		    width: 240,
		    backgroundColor: '#ccc',
		    boxShadow: '2px 2px 2px 2px',
		    padding: '10px'
		  },


		callIcon: {

			fontSize: 16,
		},


		offerLink: {

			fontSize: '14px',
			cursor: 'pointer',
			color: '#044175',
			'&:hover': {

				color: '#000'
			}
		},



		offer_input: {

			width: '115px',
			padding: '4px',
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'black',

		},

}



class Listing extends Component { 

constructor(props) {
  super(props);


this.state = {

	showThumbnails: true,
	listing: {profile:{description:''}, service_delivery_mothods:[]},
	isFavourite: false,
	offerModalOpen: false,
	offer_amount: '',
	offer_message:''
}


this.onScreenChange = this.onScreenChange.bind(this);
this.toggleFavourites = this.toggleFavourites.bind(this);
this.toggleOfferModal = this.toggleOfferModal.bind(this);
this.handleChange = this.handleChange.bind(this);

}


componentWillMount() {


     var timeout_func;

	 var checkIfImagesLoaded = function checkImgLoadFunc() {

	 	var images = document.querySelectorAll('.image-gallery-image > img');
	 	var image_count = images.length;
	 	var load_count = 0;

	 	images.forEach(function(img, idx) {
	 		if(img.naturalWidth > 0) { load_count++; }
	 	});

	 	if(image_count !== 0 && image_count === load_count) {

	 			clearTimeout(timeout_func);
				var imagesLoaded = new Event('imagesLoaded');
			  	window.dispatchEvent(imagesLoaded);


	 	} else {

	 	   timeout_func = setTimeout(checkImgLoadFunc, 500);

	 	}


	 }();



}

checkFavourites = () => {

		if(this.props.favouritesCheck(this.state.listing.id)) {
			if(!this.state) return;
			this.setState({isFavourite: true});
		}
 }


componentDidMount() {

	this.setState({listing: getListingData()}, this.checkFavourites);


	//Set Height function, sets height of gallery-wrapper so it is as high as the highest child element.
	//this prevent any content underneath from shifting up and down if gallery-wrapper exapnds and contracts depending on active child element (image).
 
 (function() {

	var galleryWrapper;
	var galleryThumbnails;
	var galleryThumbnailsWrapper;
	var tallestImgIdx;
	var imageContainers;
	var slidesContainer;
	var imageGallerySlideWrapper;
	var images;

	var setTallestImgIdx = function() {

	   var lastElementHeight = null;

	   slidesContainer = document.getElementsByClassName('image-gallery-slides')[0];
	   images = slidesContainer.getElementsByTagName('img');

	      for(var i = 0; i < images.length; i++) {

	      		 var img = images[i];

			     if(lastElementHeight &&  img.clientHeight > lastElementHeight) {
			   		lastElementHeight = img.clientHeight;
			   		tallestImgIdx = i;
			   	 	} 
			   	 else if(!lastElementHeight) {

			   	 	lastElementHeight = img.clientHeight;
			   	 	tallestImgIdx = i;
			   	 }

	      }

 	}


 	var setGalleryWrapperHeight = function(reselect) {

 		if(!images) images = slidesContainer.getElementsByTagName('img');

 		var tallestImgHeight = images[tallestImgIdx].offsetHeight;
 		if(reselect || !galleryWrapper) galleryWrapper = document.getElementsByClassName('gallery_wrapper')[0];
 		if(reselect || !imageGallerySlideWrapper) imageGallerySlideWrapper = galleryWrapper.getElementsByClassName('image-gallery-slide-wrapper')[0];
 		if(reselect || !galleryThumbnailsWrapper) galleryThumbnailsWrapper = galleryWrapper.getElementsByClassName('image-gallery-thumbnails-wrapper')[0];
 		if(reselect || !galleryThumbnails) galleryThumbnails = galleryThumbnailsWrapper.getElementsByClassName('image-gallery-thumbnails')[0];


		galleryWrapper.style.height = tallestImgHeight.toString() + 'px';
		imageGallerySlideWrapper.style.height = tallestImgHeight.toString() + 'px';
		galleryThumbnailsWrapper.style.height = tallestImgHeight.toString() + 'px';
		galleryThumbnails.style.height = tallestImgHeight.toString() + 'px';

 	}


	var setHeight = function(event) {
		var reselect = false;
		if(event) reselect = event.type === 'resizeAndReselect' ? true : false;
	    if(!tallestImgIdx) setTallestImgIdx();
		setGalleryWrapperHeight(reselect);

	}

	var removeEvents = function() {
	 window.removeEventListener('imagesLoaded', afterImagesLoaded );
	 window.removeEventListener('load', setHeight );
	 window.removeEventListener('resize', setHeight );
	 window.removeEventListener('resizeAndReselect', setHeight );
	 window.removeEventListener('removeSetHeight', removeEvents );
	}




	var afterImagesLoaded = function() {

		window.addEventListener('resize', setHeight );
		window.addEventListener('resizeAndReselect', setHeight );

		setHeight();
	}

	 // window.addEventListener('load', setHeight );
	 // window.addEventListener('resize', setHeight );
	 window.addEventListener('removeSetHeight', removeEvents );
	 window.addEventListener('imagesLoaded', afterImagesLoaded );





 	 })();

}

  


  componentWillUnmount() {
  	var remove_set_height = new Event('removeSetHeight');
  	window.dispatchEvent(remove_set_height);
  }


  toggleFavourites = () => {

  	let listing = this.state.listing;
  	let favListObject = {id: listing.id, name: listing.profile.name, age: listing.profile.age, background: listing.profile.background };
  	this.setState({isFavourite: this.props.toggleFavourites(favListObject) });


  }


 onScreenChange = function() {

  var dispatchEvent = function() {

	 	 if(this.state.showThumbnails) { 

	 	 setTimeout(function() {  window.dispatchEvent(new Event('resizeAndReselect')) }, 200);
 	} 
 }
 	
 	 this.setState({showThumbnails: this.state.showThumbnails ? false : true }, dispatchEvent);


 }     


toggleOfferModal = () => {

 	this.setState({offerModalOpen: this.state.offerModalOpen ? false : true });
 }



 handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


    handleSubmit(event) {
    	alert('implement post to server')
    event.preventDefault();
  }


 render() {


 		const { classes } = this.props;
 		const isFavourite = this.state.isFavourite;
 		const showThumbnails = this.state.showThumbnails;

 		let favStar;
 		if(!this.state.isFavourite) {

 			favStar =  <StarBorderIcon onClick={this.toggleFavourites} className={classes.favStar} />

 		} else {

 			favStar = <StarIcon onClick={this.toggleFavourites} className={classes.favStar} style={{color:'#c22000'}} />

 		}


 	    const images = [
      {
        original: '/images/bird1/large/bird1.jpg',
        thumbnail: '/images/bird1/small/bird1.jpg',
      },
      {
        original: '/images/bird2/large/bird2.jpg',
        thumbnail: '/images/bird2/small/bird2.jpg',
      },

      {
        original: '/images/bird3/large/bird3.jpg',
        thumbnail: '/images/bird3/small/bird3.jpg',
      },
      {
        original: '/images/bird1/large/bird1.jpg',
        thumbnail: '/images/bird1/small/bird1.jpg',
      },
      {
        original: '/images/bird2/large/bird2.jpg',
        thumbnail: '/images/bird2/small/bird2.jpg',
      },

      {
        original: '/images/bird3/large/bird3.jpg',
        thumbnail: '/images/bird3/small/bird3.jpg',
      }


    ]

    const listing = this.state.listing;
    const profile = listing.profile;
    const service_delivery_mothods = listing.service_delivery_mothods.join('/');

    const offer_link = listing.offers_accepted ? <span><b>(</b><span onClick={this.toggleOfferModal} className={classes.offerLink}>Make Offer</span><b>)</b></span> : null;


 	return(

 
 		<div id="listing">

 			 <div className="gallery_wrapper">
 			 <ImageGallery useBrowserFullscreen={false} onScreenChange={this.onScreenChange} flickThreshold={4} preventDefaultTouchmoveEvent={true} showThumbnails={showThumbnails} disableThumbnailScroll={false} items={images} thumbnailPosition="left" />
 			 </div>
 			 <section className="info">

 			 <Grid container  spacing={0}>
 			 <Grid container className="topFieldContainer" alignItems="center">
	 			 <Grid sm={6} xs={6} item className="column"><div>{profile.name}</div></Grid>
	 			 <Grid sm={3} xs={3} item className="column"><div>Age: {profile.age}</div></Grid>
	 			 <Grid sm={3} xs={3} item className="column"><div><span className="notBold">Height: {profile.height + 'cm'}</span></div></Grid>
	 		 </Grid>

	 		 <Grid container className="fieldContainer" alignItems="center">
	 			 <Grid sm={6} xs={6} item className="column"><div>Background:</div></Grid>
	 			 <Grid sm={6} xs={6} item className="column"><div> {profile.background}</div></Grid>
	 			 <Grid sm={6} xs={6} item className="column"><div>Service: </div></Grid>
	 			 <Grid sm={6} xs={6} item className="column"><div>{service_delivery_mothods}</div></Grid>
	 			 <Grid sm={6} xs={6} item className="column"><div><CallIcon className={classes.callIcon}/></div></Grid>
	 			 <Grid sm={6} xs={6} item className="column"><div><b>{listing.contact_no}</b></div></Grid>
	 		 </Grid>

	 		  <Grid container className="topFieldContainer" alignItems="center">
	 			 <Grid sm={6} xs={6} item className="column"><div><span className="notBold">From: </span>${listing.starting_price} {offer_link}</div></Grid>
	 			 <Grid sm={6} xs={6} item className="column"><div><span className="notBold">Location: </span>{listing.location}</div></Grid>
	 		 </Grid>

	 		 <Grid container className="clearContainer" alignItems="center">
	 			 <Grid sm={6} xs={6} item><div style={{fontSize: 13, fontWeight: 'bold' }}>Listed: {listing.date_listed}</div></Grid>
	 			 <Grid sm={6} xs={6} container  justify="center" alignItems="center" item>

	 			 		<Grid item>
            				<div style={{fontSize: 16, color:'#ccc', width: '42px', textAlign: 'right' }} >{!isFavourite ?  'SAVE' : 'FAV' }</div>
            			</Grid>

            			<Grid item>
            			    {favStar}
            			 </Grid>
            			

				 </Grid>
	 		 </Grid>



	 			 	<Grid justify="center"  container>
	 			 		<Grid item><div className="descriptionText" dangerouslySetInnerHTML={{ __html: profile.description  }}></div></Grid>
	 			 	</Grid>
 			 	</Grid>


	 		<div>
	 		This is the Listing component. It is currently displaying
	 		listing with ID of {this.props.listing_id} for {this.props.listing_name}
	 		</div>
	 	   </section>




   <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.offerModalOpen}
          onClose={this.toggleOfferModal}
        >
          <div style={{ margin:'0 auto', top:'35%', position: 'relative', height:'180px'}} className={classes.paper} >

    		<form onSubmit={this.handleSubmit} noValidate>

		          <Input
		            id="adornment-amount"
		            value={this.state.offer_amount}
		            placeholder="Offer amount"
		            disableUnderline={true}
		            autoFocus={true}
		            className={classes.offer_input}
		            onChange={this.handleChange('offer_amount')}
		            startAdornment={<InputAdornment position="start">$</InputAdornment>} /> 

				      <IconButton style={{float:'right'}} onClick={this.toggleOfferModal} aria-label="Cancel">
		                <CancelIcon color="secondary" />
		              </IconButton>


						 <TextField
				          id="multiline-flexible"
				          label="Message"
				          multiline
				          rowsMax="2"
				          rows={2}
				          InputProps={{className: classes.textField}}
				          value={this.state.offer_message}
				          onChange={this.handleChange('offer_message')}
				          margin="normal" />




					  <Button type="submit" variant="outlined">
				        Submit
				      </Button>


        		</form>


          </div>
        </Modal>

 		</div>


 		);
 }
}


export default withStyles(styles)(Listing);