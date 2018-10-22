import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import DialogBar from '../../../UIcomponents/DialogBar'
import Login from './Login'

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


class LoginDialog extends Component { 

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
			open={this.props.renderLoginDialog}
			onClose={this.props.handleLoginDialogClose}
			aria-labelledby="responsive-dialog-title"
			>
			
				<DialogBar title="OzAdult &gt; Log-in" handleDialogClose={this.props.handleLoginDialogClose} />

				<DialogContent className={classes.root}>
				 	
					<Login doLogin={this.props.doLogin} isAuthenticated={this.props.isAuthenticated} location={this.props.location} />

				</DialogContent>
	
			</Dialog>


 		);
 }
}


export default withStyles(styles)(LoginDialog);