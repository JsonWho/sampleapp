import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './NewAdWizard.css';
import MenuItem from '@material-ui/core/MenuItem';


import JpuriWYSIWG from '../../../UIcomponents/JpuriWYSIWG/JpuriWYSIWG';

import RichTextEditor from '../../../UIcomponents/RichTextEditor/RichTextEditor';
import WhiteBorderTextField from '../../../UIcomponents/WhiteBorderTextField';
import WhiteBorderSelect from '../../../UIcomponents/WhiteBorderSelect';
import ReactSelectCustom from '../../../UIcomponents/ReactSelectCustom';

import ErrorList from '../../../UIcomponents/ErrorList';

import Grid from '@material-ui/core/Grid';


const getData = () => (

    
    
    
         [
          { id: 11, name:'Jaz Brown', suburb: 'Surry Hills', age: 23, background:{ label: 'Vanilla', value: 'vanilla'}, bodytype:'Petite', description: {raw:{"blocks":[{"key":"mjlp","text":"how dee","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ck3hk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8c64k","text":"doo yaaaabk","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}},text: undefined}},
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
          ]

    

)



class ProfileDetails extends React.Component {

	constructor() {
    super();

	    this.state = {
	      required_values: [],
		  keyVal: {},
		  profile_id: 0,
		  loadingProfile: false,
        // checkForm: true
	  }

	}


  static getFieldData() {

  	const fieldData = 
  		{ 

  			fieldNames: ['name','age','bodytype','starting_price','height','background','description'], 

  		    fieldConfig: {


			        name: [ 

			        {name:'alphabetic', event_type:'onChange', behavior: 'blocking'}, 
			        {name:'required', event_type:'onBlur'} 
			        ],
			        //display types: error-list, field, all, none
			        age: [

			         //behavior for validation. If blocking then it does not allow invalid input to be entered. This must be the first validation rule for the field, otherwise it will not be utilsed.
			         {name:'number', event_type:'onChange', behavior: 'blocking' }, 
			         {name:'number_max', event_type:'onChange', testval: 99, error_code: 'maxnum',displayOn:'error-list', behavior: 'blocking' }, 
			         {name:'number_min', event_type:'onBlur', testval: 18, error_code: 'minimum_age',displayOn:'error-list' }, 
			         {name:'required', event_type:'onBlur', displayOn:'error-list'}, 
			         ],

			        description: [ 
			        // {name:'alphabetic', event_type:'onChange', behavior: 'blocking'}, 
			        {name:'required', event_type:'onBlur', displayOn:'error-list'},
              {name:'minlength', event_type:'onBlur', testval: 18, error_code: 'minlength',displayOn:'error-list' }, 
 
			        ],


	      }
  		}

    return fieldData;
}




   loadProfile = (pid) => {
	

		let profile = getData().find((el,idx) => {return el.id == pid});
		let promise = this.props.setData(profile);

	    return promise;

   }

//    comonentWillUnmount() {

// 		if(this.state.profile_id !== 0) {

// 			this.props.('profile_details');
// 		}
//    }

	componentWillMount() {

		let profile_id = this.props.profileDetails ? this.props.profileDetails.id : 0;

			// if(profile_id == 0) {
			// let state = this.props.stepState;
			// if(state) this.setState(state);
			// } else { }
			this.setState({profile_id: profile_id});
			this.setState({loadingProfile: profile_id == 0 ? false : true });
		

		this.props.setStepData('profile_details',4);
	}

	componentDidMount() {

		if(this.state.profile_id !== 0) {

			this.loadProfile(this.state.profile_id).then((res)=> {

				this.setState({loadingProfile:false});

			});
		}
	}



	// <JpuriWYSIWG loadInProgress={this.props.profileDetails && this.props.profileDetails.id !== 0 ? true : false } name="description" editorState={this.props.description} saveEditorState={this.props.saveEditorState} remainingCharactersBeforeWarning={100} maxLength={4000} />


render() {

let ageFieldStyle = { width: '65px' }

const errorList = this.props.errorList;


let editor = this.state.loadingProfile ? 
<p>Loading</p> : 
<JpuriWYSIWG newval='fdf' name="description" editorState={this.props.description} saveEditorState={this.props.saveEditorState} remainingCharactersBeforeWarning={100} maxLength={4001} /> ;


	return(

		<div style={{padding:'50px 15px 85px 15px'}} className="stepWrapper">

		<h2>{this.props.name}</h2>

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
            inputProps={{maxLength: 2}}
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
          		value={this.props.bodytype}
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



		{editor}

  	</div>
  	);
}


}

export default ProfileDetails;


const styles = {

	ageField: {

		width: 50,
	}
}