import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';


const styles = {
  root: {
    padding: 5,
  },
  flex: {
  	flex: 1
  },

  FormControlLabel: {

  	'& svg': {

  		color: 'black'
  	}
  },


}



class FilterDialog extends Component { 

constructor(props) {
  super(props);

  this.state = {
  	someprop: false
  };


}


componentDidMount() {


      }




 render() {


 	const {classes} = this.props;
 	let checkboxData = this.props.checkboxData;

 	let checkBoxes = checkboxData.map((cdata, index) => 

		          <FormControlLabel classes={{ root: classes.FormControlLabel }} key={cdata.id}
		            control={
			              <Checkbox 
			                checked={cdata.checked}
			                onChange={this.props.toggleFilterCheckbox(index)}
		             		value={cdata.id.toString()} />
		            	}
		            label={cdata.name} /> );

 	return(

 		
			<Dialog
			fullScreen={false}
			fullWidth={true}
			open={this.props.showFilterDialog}
			onClose={this.props.toggleFilterDialog}
			aria-labelledby="responsive-dialog-title">
			
		     <AppBar position="static">
		        <Toolbar>

				           <Typography variant="title" color="inherit" className={classes.flex}>
				           Filter search
          					</Typography>
          			<IconButton onClick={this.props.toggleFilterDialog} aria-label="Cancel">
				        <CancelIcon />
				      </IconButton>

		        </Toolbar>
		      </AppBar>

			<DialogContent className={classes.root}>


					<FormControl component="fieldset">
			        <FormLabel component="legend">Must offer:</FormLabel>
			         <FormGroup>


						 	{checkBoxes}

					</FormGroup>
					<FormHelperText>Be careful</FormHelperText>
					</FormControl>

			</DialogContent>

			<DialogActions>
			<Button onClick={this.props.toggleFilterDialog} color="primary">
			Disagree
			</Button>
			<Button onClick={this.props.toggleFilterDialog} color="primary" autoFocus>
			Agree
			</Button>
			</DialogActions>
			</Dialog>


 		);
 }
}


export default withStyles(styles)(FilterDialog);