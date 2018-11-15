import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './NewAdWizard.css'
import FaceIcon from '@material-ui/icons/Face';
import StoreIcon from '@material-ui/icons/Store';




class AdType extends React.Component {

	constructor() {
    super();

	    this.state = {
	      required_values: ['ad_type'],
	      keyVal: {ad_type: null, active_hover: null}
	    }

	}


	componentDidMount() {

		let state = this.props.stepState;
		if(state) this.setState(state);

		this.props.setStepData('ad_type',2);
	}


	mOver = event => {

		let copy = Object.assign({}, this.state.keyVal);
		copy.active_hover = event.currentTarget.id;
		this.setState({ keyVal: copy });
	}

	 mOut = event => {

		let copy = Object.assign({}, this.state.keyVal);
		copy.active_hover = null;
		this.setState({keyVal: copy});
	}


    saveStateToParent = () => {
			let state_copy = Object.assign({}, this.state);
			this.props.saveStageState(state_copy);
		}

    bClick = event => {

		let copy = Object.assign({}, this.state.keyVal);
		copy.ad_type = event.currentTarget.id;
		copy.active_hover = event.currentTarget.id;


		this.setState({keyVal: copy }, this.saveStateToParent);
		
	}



	infoBoxState = (name) => {

		let ahover = this.state.keyVal.active_hover;
		let abutton = this.state.keyVal.ad_type;

		if(ahover === name) { 
			return 'show'; 
		} else if (ahover && ahover !== name) {
			return '';
		} else if (!ahover && abutton == name) {
			return 'show';
		}
	      else{
	      	return '';
	      }
	}





render() {

const ad_type = this.state.keyVal.ad_type;

// let conditional_content = null;

//       if(ad_type == 'profile') 
// 	   {
// 		   	conditional_content = <div>profile content</div>
// 	   }

// 	  else if(ad_type =='location')
// 	   {
// 		   	conditional_content= <div>location content</div>
// 	   }




	return(

		<div style={{paddingTop:'100px'}} className="stepWrapper">
	
		<span className="topTitle">What kind of ad do you want post ?</span>

	    <div className="buttonContainer">

		<div id="profile" onTouchEnd={this.bClick} onMouseOver={ this.mOver } onMouseOut={ this.mOut }  onClick={ this.bClick } className={'roundButton'+' '+ (ad_type == 'profile' ? 'active' : '') }>
			<FaceIcon/>
			<div className="label">Individual</div>
		</div>

		<div className={'infoBox' +' '+ this.infoBoxState('profile') }>
			<span>
				Create ad for an individual, a private listing or for a specific employee.
			</span>
		</div>





		<div id="location" onTouchEnd={this.bClick} onMouseOver={ this.mOver } onMouseOut={ this.mOut }  onClick={ this.bClick } className={'roundButton'+' '+ (ad_type == 'location' ? 'active' : '') }>
			<StoreIcon/>
		    <div className="label">Shop/Address</div>
		</div>

		<div className={'infoBox' +' '+ this.infoBoxState('location') }>
			<span>
				Create ad for shop or other location. Ad will show business description and any individuals assigned to this location.
			</span>
		</div>


		</div>



		</div>
  
  );
}


}



export default AdType;