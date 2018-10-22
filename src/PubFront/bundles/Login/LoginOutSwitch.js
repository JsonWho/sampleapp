import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';


const style = {  



  colorSwitchBase: {
    color: '#ccc',
    '&$colorChecked': {
      color: '#3cd01a',
      '& + $colorBar': {
      },
    },
  },

   colorBar: {},
  colorChecked: {},



}

const LoginOutSwitch = props => (

          <div>
            <div style={{top: '10px', left: '13px', position: 'relative' }}>{props.isAuthenticated ? 'Logout' : 'Login'} </div>

            <Switch  classes={{
                switchBase: props.classes.colorSwitchBase,
                checked: props.classes.colorChecked,
                bar: props.classes.colorBar,
              }} checked={props.isAuthenticated} onChange={props.toggleLoginState} aria-label="LoginSwitch" />

           </div>


    

);


export default withStyles(style)(LoginOutSwitch);