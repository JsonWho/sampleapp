import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './WhiteBorderCheckboxStyles';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';




const WhiteBorderCheckbox = (props) => (



      <FormControlLabel classes={{label: props.classes.label}}
          control={
		        <Checkbox classes={{root: props.classes.root}}
		          checked={props.isChecked(props.value)}
		          onChange={() => { props.handleCheckboxEvent(props.value) }}
		          value={props.value} /> }
      
         			
        label={props.label} />


);


export default withStyles(styles)(WhiteBorderCheckbox);



        



