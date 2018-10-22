import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import DialogBar from '../../../UIcomponents/DialogBar';
import ResetPassword from './ResetPassword';

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


class ResetPasswordDialog extends Component { 

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
			open={this.props.renderResetPasswordDialog}
			onClose={this.props.handleResetPasswordDialogClose}
			aria-labelledby="responsive-dialog-title"
			>
			
				<DialogBar title="OzAdult &gt; Reset Password" handleDialogClose={this.props.handleResetPasswordDialogClose} />

				<DialogContent className={classes.root}>
				 	
					<ResetPassword doResetPass={this.props.doResetPass} isAuthenticated={this.props.isAuthenticated}  />

				</DialogContent>
	
			</Dialog>


 		);
 }
}


export default withStyles(styles)(ResetPasswordDialog);