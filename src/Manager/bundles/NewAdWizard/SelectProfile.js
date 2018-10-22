import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './NewAdWizard.css'
import FaceIcon from '@material-ui/icons/Face';
import StoreIcon from '@material-ui/icons/Store';
import WhiteBorderButton from '../../../UIcomponents/WhiteBorderButton';



class SelectProfile extends React.Component {

	constructor() {
    super();

	    this.state = {
	      required_values: ['selected_option'],
	      keyVal: {selected_option: {}, option_type: null}
	    }

	}


	componentDidMount() {

		let state = this.props.stepState;
		if(state && state.keyVal)  { 
						if(this.props.ad_type === state.keyVal.option_type)
						this.setState((state), () => { this.sortOptions() });

					}
		

		this.props.setStepData('select_profile',3);
	}


	sortOptions = () => {

		if(this.state.keyVal.selected_option.id && this.state.keyVal.selected_option.id !== 0) {

		let arr = this.props.data[(this.props.ad_type + 's')];


		}
	}


 	saveStateToParent = () => {
			let state_copy = Object.assign({}, this.state);
			this.props.saveStageState(state_copy);
    }


	optionClicked = (o) => {

		this.setState({keyVal: {selected_option: o, option_type: this.props.ad_type }}, this.saveStateToParent);

	}

	isOptionSelected = (id) => {

		let selected_option = this.state.keyVal.selected_option;

		if(selected_option && selected_option.id === id) {

			return ' selected'		
		}

		return '';
	}


	newProfileClicked = () => {

	  this.setState({keyVal: {selected_option: {id:0} }}, () => { 




	  				this.saveStateToParent(); 
	  				// setTimeout(() => this.props.nextButtonClicked(), 50);
	  				this.props.nextButtonClicked();
	  });

	}


render() {


			const list = this.props.data.map(p => 
				<div key={p.id} onClick={() => this.optionClicked(p)} className={'row' + this.isOptionSelected(p.id)}><div>{p.name}</div><div>{p.age}</div><div>{p.background}</div></div> )





	return(
		<div>

		<div className="stickyHeader">
			<span className="topTitle">Select existing {this.props.ad_type} or create a new one.</span>

		    <div><WhiteBorderButton onClick={this.newProfileClicked} ><strong> New {this.props.ad_type} </strong></WhiteBorderButton></div>
		    </div>


		<div style={{paddingTop:'120px'}} className="stepWrapper">
		


			<div className="optionList">


			  {list}

			</div>

		</div>
		</div>

	);
}


}



export default SelectProfile;