import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './NewAdWizard.css'
import WhiteBorderButton from '../../../UIcomponents/WhiteBorderButton';




class SelectCat extends React.Component {

	constructor() {
		super();

		this.state = {
			required_values: ['selected_cat'],
			keyVal: {selected_cat: {id:0}}
		}

	}


	componentDidMount() {

		let state = this.props.stepState;
		if(state) this.setState(state);

		this.props.setStepData('select_cat',1);
	}


	saveStateToParent = () => {
		let state_copy = Object.assign({}, this.state);
		this.props.saveStageState(state_copy);
	}

	catClicked = (cat) => {

		let copy = Object.assign({}, this.state.keyVal);
		copy.selected_cat = cat;


		this.setState({keyVal: copy }, this.saveStateToParent);
		
	}

	isCatSelected = (cat_id) => {

		return this.state.keyVal.selected_cat.id === cat_id;
	}




	render() {


			const catlist = this.props.data.map(c => 
				<WhiteBorderButton key={c.id} onClick={() => this.catClicked(c)} isSelected={this.isCatSelected(c.id)}>{c.name}</WhiteBorderButton> )




		return(
			<div>
			 {catlist}
			 </div>
			);
		}
	}






export default SelectCat;