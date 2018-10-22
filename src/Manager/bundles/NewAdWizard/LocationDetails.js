import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './NewAdWizard.css';
import MenuItem from '@material-ui/core/MenuItem';



import RichTextEditor from '../../../UIcomponents/RichTextEditor/RichTextEditor';
import WhiteBorderTextField from '../../../UIcomponents/WhiteBorderTextField';
import WhiteBorderSelect from '../../../UIcomponents/WhiteBorderSelect';
import ReactSelectCustom from '../../../UIcomponents/ReactSelectCustom';

import ErrorList from '../../../UIcomponents/ErrorList';

import Grid from '@material-ui/core/Grid';





class LocationDetails extends React.Component {

	constructor() {
    super();

	    this.state = {
	      required_values: [],
	      keyVal: {},
	  }

	}


  static getFieldData() {

  	const fieldData = 
  		{ 

  			fieldNames: ['name','age','bodytype','starting_price','height','background','description'], 

  		    fieldConfig: {


			        name: [ 

			        {name:'alphabetic', event_type:'onChange', behavior: 'blocking'}, 
			        {name:'required', event_type:'onBlur'}, 
			        ],
			        //display types: error-list, field, all, none
			        age: [

			         //behavior for validation. If blocking then it does not allow invalid input to be entered. This must be the first validation rule for the field, otherwise it will not be utilsed.
			         {name:'number', event_type:'onChange', behavior: 'blocking' }, 
			         {name:'number_min', event_type:'onBlur', testval: 18, error_code: 'minimum_age',displayOn:'error-list' }, 
			         {name:'required', event_type:'onBlur', displayOn:'error-list'}, ]


	      }
  		}

    return fieldData;
}








	componentWillMount() {


		let state = this.props.stepState;
		if(state) this.setState(state);

		this.props.setStepData('location_details',4);
	}





render() {

let ageFieldStyle = { width: '65px' }

const errorList = this.props.errorList;




	return(

		<div style={{padding:'50px 15px 30px 15px'}} className="stepWrapper">

		<ErrorList errorList={errorList} />

<Grid container>
		<Grid container alignItems="flex-end" item spacing={8}>
      	
      	<Grid item>
		<WhiteBorderTextField item key="name"
            hasErrors={this.props.hasErrors} 
            getHelperText={this.props.getHelperText}
            displayName="Name" 
            handleInputEvent={this.props.handleInputEvent}
            value={this.props.name} 
            name="name" 
          type="text" />
          </Grid>

          <Grid item>
         <WhiteBorderTextField item key="age"
            hasErrors={this.props.hasErrors} 
            getHelperText={this.props.getHelperText} 
            handleInputEvent={this.props.handleInputEvent}
            value={this.props.age}
            displayError={false}
            displayName="Age"
            widthStyle={styles.ageField}
            name="age" 
          type="text" />
          </Grid>


          </Grid>




          <Grid item item justify="flex-start" alignItems="flex-end" container>

 
          	<Grid item sm={5} xs={12}>

					
					<ReactSelectCustom name="background" onChange={this.props.reactSelectChangeHandler} value={this.props.background} placeholder="Background"/>

          	</Grid>



          <Grid item sm={7} xs={12} style={{textAlign: 'left'}}>
          	<WhiteBorderSelect 
          		name="bodytype" 
          		onChange={this.props.handleInputEvent} 
          		value={this.props.bodytype} l
          		label="Body Type&nbsp;&nbsp;&nbsp;">

           <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Slim">Slim</MenuItem>
            <MenuItem value="Athletic">Athletic</MenuItem>
            <MenuItem value="Curvy">Curvy</MenuItem>
            <MenuItem value="Petite">Petite</MenuItem>
            <MenuItem value="Big girl">Big girl</MenuItem>
            <MenuItem value="Mature">Mature</MenuItem>

          	</WhiteBorderSelect>
          	</Grid>

          </Grid>

          </Grid>



  	<RichTextEditor name="description" editorState={this.props.stepState.description || {}} saveEditorState={this.props.saveEditorState} />


  	</div>
  	);
}


}

export default LocationDetails;


const styles = {

	ageField: {

		width: 50,
	}
}