import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './WhiteBorderButtonStyles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const WhiteBorderButton = (props) => (

	 <Button disabled={props.isDisabled} style={props.isSelected ? {backgroundColor: '#00000024'}: null} disableRipple={true} onClick={ props.onClick } variant="outlined" classes={{  root: props.classes.root, disabled: props.classes.disabled }}>
         <strong>{props.children}</strong>
      </Button>

);


export default withStyles(styles)(WhiteBorderButton);



