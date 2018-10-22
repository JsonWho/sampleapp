import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';



const styles = {

	errorList: {

		visibility: 'hidden',
		height: '50px',
		'&>div': {

			backgroundColor:'red',
			textTransform:'capitalize'
		}

	},

	show: {

		visibility: 'visible'
	}
}


class ErrorList extends React.Component {

			    render() {

			    const {classes} = this.props;
				
				const errorList = this.props.errorList;

				let errorListObjects = [];

				for(var prop in errorList) {

					for(var cprop in errorList[prop]) {
						errorListObjects.push ( <div key={prop+'_'+cprop}>{prop + ': ' + errorList[prop][cprop].error_msg}</div> ); 
					}
				}

			

			return (

					<div className={classes.errorList +' '+ (errorListObjects.length > 0 ? classes.show: '')}>
						{errorListObjects}
					</div>

				);


	}

}



export default withStyles(styles)(ErrorList);
