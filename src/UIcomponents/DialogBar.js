import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {


  flex: {

    flex: 1
  },

   
      root: {

        boxShadow: 'none !important',
        borderBottom: '1px solid #ea4527',

       }

  

};

function ButtonAppBar(props) {

  const { classes } = props;
  return (
    
      <AppBar classes={{root: classes.root }} position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
             {props.title}
            </Typography>
        
         <IconButton color="secondary" onClick={props.handleDialogClose} aria-label="Cancel">
            <CancelIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
  
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);