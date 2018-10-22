     
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './WhiteBorderTextFieldStyles' 
import { withStyles } from '@material-ui/core/styles';



class WhiteBorderTextField extends React.Component {




  render() {

      return ( <TextField
              id={this.props.name}
              label={this.props.displayName || this.props.name}
              name={this.props.name}
              InputLabelProps={{shrink: true, className: this.props.classes.bootstrapFormLabel}}
              className={this.props.classes.textField}
              style={this.props.widthStyle}
              placeholder={this.props.placeholder}
              type={this.props.type}
              value={this.props.value}
              FormHelperTextProps={{ classes: { root: this.props.classes.helperTextRoot, error: this.props.classes.helperTextError  } }}
              helperText = {this.props.getHelperText(this.props.name, this.props.displayError)}
              onChange={this.props.handleInputEvent}
              onBlur={this.props.handleInputEvent}
              error={this.props.hasErrors(this.props.name)}
              autoComplete={'current-'+this.props.name}
              margin="normal"
              inputProps={this.props.inputProps} 
              InputProps={{
                disableUnderline: true,
              classes: {
                root: this.props.classes.bootstrapRoot,
                input: this.props.classes.bootstrapInput,
                error: this.props.classes.textfieldError
              }, 
      }} /> );
    }
  };


  export default withStyles(styles)(WhiteBorderTextField);