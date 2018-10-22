import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import DialogBar from '../../../UIcomponents/DialogBar'
import SignUp from './SignUp'

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
    paddingTop:0,
    backgroundColor:'#cc2200'
  },

}


class SignUpDialog extends Component { 

constructor(props) {
  super(props);

}




componentDidMount() {


      }


 render() {


 	const {classes} = this.props;

 	return(

 		
			<Dialog
			fullScreen={true}
			open={this.props.renderSignUpDialog}
			onClose={this.props.handleSignUpDialogClose}
			aria-labelledby="responsive-dialog-title"
			>
			
				<DialogBar title="OzAdult &gt; Sign-Up" handleDialogClose={this.props.handleSignUpDialogClose} />

				<DialogContent className={classes.root}>
				 	
					<SignUp doLogin={this.props.doLogin} isAuthenticated={this.props.isAuthenticated} />

				</DialogContent>
	
			</Dialog>


 		);
 }
}


export default withStyles(styles)(SignUpDialog);