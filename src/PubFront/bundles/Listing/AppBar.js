import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {

    menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  flex: {

    flex: 1
  }

};

function ButtonAppBar(props) {

  const { classes } = props;
  return (
    <div>
      <AppBar classes={{root: classes.root }} position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {props.listing_name}
          </Typography>
        
         <IconButton color="secondary" onClick={props.handleDialogClose} aria-label="Cancel">
            <CancelIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);