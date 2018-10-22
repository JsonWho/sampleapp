import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './NewAdWizard.css'
import FaceIcon from '@material-ui/icons/Face';
import StoreIcon from '@material-ui/icons/Store';

import SelectCat from './SelectCat';
import AdType from './AdType';
import SelectProfile from './SelectProfile';
import SelectLocation from './SelectLocation';
import ProfileDetails from './ProfileDetails';
import LocationDetails from './LocationDetails';


import WhiteBorderButton from '../../../UIcomponents/WhiteBorderButton';
import ValidationHOC from '../../../validation/ValidationHOC';
import validation from '../../../validation/validation';




const LocationDetailsWithValidation = ValidationHOC(LocationDetails);
const ProfileDetailsWithValidation = ValidationHOC(ProfileDetails);


class NewAdWizard extends React.Component {

	constructor() {
    super();

    this.state = {

    	current_step_name: 'ad_type',
    	current_step_num: 1,
    	prev_step_name: null,
    	total_steps: 5,

    	select_cat: {}, 
    	ad_type:{keyVal:{ad_type:null}},
    	select_profile:{},
    	select_location:{},
    	location_details:{},
    	profile_details:{}

    }


    this.saveStageState = this.saveStageState.bind(this);
    this.nextButtonClicked = this.nextButtonClicked.bind(this);
    this.setStepData = this.setStepData.bind(this);

	}

	saveStageState = (data) => {

		let current_step_name = this.state.current_step_name;

		this.setState({[current_step_name]: data });

	}


	getNextButtonState = () => {

		let current_step_name = this.state.current_step_name;
	    let current_step_num = this.state.current_step_num;

		let stepData = this.state[current_step_name];

		if(current_step_num >= this.state.total_steps) return true;

		if(stepData.required_values) {

			let count = 0;
			let required_values = stepData.required_values;

		   for(var i = 0; i < required_values.length; i++) {

		   		if(stepData.keyVal[required_values[i]]) count++;
		   }

		   if(required_values.length === count) return false;

		}

		if(stepData.checkForm) {

		   let fc = stepData.fieldConfig;
		   let fieldNames = stepData.fieldNames;

		   const getVal = (propName) => {
		   	 return stepData[propName];
		   }

		   let error_data = validation.validateForm(fc, stepData, fieldNames, getVal );
		   if(error_data.count === 0) return false; 
		}


				   return true;
	}


	markAsCompleted = (stepName) => {

			let stepStateCopy = Object.assign({}, this.state[stepName]);
			stepStateCopy.completed = true;
			this.setState({[stepName]: stepStateCopy });
	}


	nextButtonClicked = () => {

		    let current_step_num = this.state.current_step_num;
		    let current_step_name = this.state.current_step_name;

			let nextStep = (current_step_num + 1);
			let stage_name = '';

			//mark step as completed
			this.markAsCompleted(current_step_name);

		    let selected_option = this.state.ad_type.keyVal.ad_type;


			if(nextStep == 3) {

				//check if existing data for locations or profiles exists
				if(selected_option === 'location' && 
				    (!this.props.data.locations || this.props.data.locations.length == 0 )) { nextStep = 4; this.markAsCompleted('select_location'); }

			    else if(selected_option === 'profile' && 
				    (!this.props.data.profiles || this.props.data.profiles.length == 0 ))   { nextStep = 4; this.markAsCompleted('select_profile'); }

			} 

				

				switch(nextStep) {

				   case 2:
				   stage_name = 'ad_type';
				   break;

				   case 3:
				   stage_name = 'select'+'_'+selected_option;
				   break;

				   case 4:
				   stage_name = selected_option+'_'+'details';
				   break;
				}
				
			


			this.setState({prev_step_name: current_step_name}, () => { 
				this.props.history.push(('/newadwizard/' + stage_name), null, null); });
	}


	setStepData = (stepName, stepNum) => {

		if(stepNum > 1) {

			let prev_step_name = this.state.prev_step_name;
			if(!prev_step_name || !this.state[prev_step_name].completed) {

				this.props.history.push(('/newadwizard'), null, null);
			}
		}

		this.setState({current_step_num: stepNum});
		this.setState({current_step_name: stepName});

	}


render() {



if(this.props.data) {

	return(

		<div className="wizardWrapper">

		<Switch>

	    <Route exact path="/newadwizard"  render={()=> <SelectCat stepState={this.state.select_cat} data={this.props.data ? this.props.data.categories : []}  saveStageState={this.saveStageState} setStepData={this.setStepData} />  }/>

		<Route exact path="/newadwizard/ad_type"  render={()=> <AdType stepState={this.state.ad_type}  saveStageState={this.saveStageState} setStepData={this.setStepData} />  }/>

        <Route exact path="/newadwizard/select_profile"  render={() => (<SelectProfile nextButtonClicked={this.nextButtonClicked} stepState={this.state.select_profile} data={this.props.data.profiles} saveStageState={this.saveStageState} ad_type={this.state.ad_type.keyVal.ad_type} setStepData={this.setStepData}/>) } />
        <Route exact path="/newadwizard/select_location"  render={() => (<SelectLocation nextButtonClicked={this.nextButtonClicked} stepState={this.state.select_location} data={this.props.data.locations} saveStageState={this.saveStageState} ad_type={this.state.ad_type.keyVal.ad_type} setStepData={this.setStepData}/>) } />

        <Route exact path="/newadwizard/location_details"  render={() => <LocationDetailsWithValidation setStepData={this.setStepData} stepState={this.state.location_details} saveStageState={this.saveStageState} /> } />
        <Route exact path="/newadwizard/profile_details"  render={() => <ProfileDetailsWithValidation  setStepData={this.setStepData} stepState={this.state.profile_details} saveStageState={this.saveStageState} /> } />

        </Switch>

        <div className="stickyFooter">
        	<WhiteBorderButton onClick={this.nextButtonClicked} isDisabled={this.getNextButtonState()}> Next </WhiteBorderButton>
        </div>

        </div>
 
  );
}

    return (<div>loading</div>);

  

}


}



export default NewAdWizard;