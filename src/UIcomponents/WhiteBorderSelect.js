import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';		 


const styles = {

  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 140,
    backgroundColor: '#cc2200',
    marginTop: 17

  },
  selectEmpty: {
    // marginTop: theme.spacing.unit * 2,
  },
  icon: {
  	color:'#fff'
  },
  select:{
    border: '1px solid #fff',
    borderRadius: '4px !important',
        color:'#fff !important',
        paddingTop: '14px',
        paddingBottom: '13px',
        textAlign:'center',
  },


 labelRoot: {
	  	textAlign:'center',
	  	color:'white',
	  	width:'100%',
	  	top: '10px'

	  },

 labelShrink: {

	  		textAlign: 'left !important',
	  		color: 'white !important',
	  		top: '0px'
	  	}, 

};




class WhiteBorderSelect extends React.Component {




render() {

	const {classes} = this.props;

			return(

		        <FormControl className={classes.formControl}>
		          <InputLabel classes={{ root: classes.labelRoot, shrink: classes.labelShrink }}>{this.props.label}</InputLabel>
		          <Select
		            classes={{icon: classes.icon, select: classes.select}}
		            value={this.props.value}
		            onChange={this.props.onChange}
		            input={<Input disableUnderline={true} name={this.props.name} />}
		         >


		            {this.props.children}

		          </Select>
		        </FormControl>
		        );

		    }


		}


export default withStyles(styles)(WhiteBorderSelect);