import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

// import validators from '../../../utils/validation';
import validation from '../../../validation/validation';


import {withStyles} from '@material-ui/core/styles';



const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 185,
    margin: '0 auto',
    paddingTop: '20%'
  },
  textField: {
    width: 185,
  },

    bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: 20,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: '#cc2200',
    border: '1px solid #fff',
    fontSize: 16,
    height:'26px',
    color:'#fff',
    padding: '10px 12px',
    '&:focus': {
      borderWidth: '2px',
      padding: '9px 11px'
    },
  },
  bootstrapFormLabel: {
    fontSize: 19,
    color:'#fff !important',
  },
  button: {

    borderColor:'#fff',
    color:'white',
    marginTop:'15px',
    margin: '0 auto'

  },

  textfieldError: {
    '&>input': {

      backgroundColor: 'white',
      color: 'red',
    }
  },

  linkBorder: {

    color: '#fff !important',
    border: '1px solid #ea4527',
    borderRadius: 4,
    padding: '2px 4px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.23)'
    }
  },

  helperTextRoot: {

      padding: '2px 3px 2px 3px',
      visibility: 'hidden',
      borderRadius: '2px',
      color: '#fff !important',
      backgroundColor: 'red',
    },

    helperTextError: {
      visibility: 'visible',
    }

 
}





class SignUp extends React.Component {

constructor() {

super();

  this.state = {

      password: '',
      password_confirm: '',
      email: '',
      test: '',

      emailErrors: {errors:[], isDirty: false},
      passwordErrors: {errors:[], isDirty: false},      
      password_confirmErrors: {errors:[], isDirty: false},
      testErrors: {errors:[], isDirty: false},

      formFieldNames:[],

      fieldConfig: {

        email: {
          onBlur: ['email', 'required'],
          onChange: ['required']
        },

        password: {

          onBlur: [
            {name:'minlength',testval:5}, 
            'required', 
            {name:'match',testval: () => { return this.getVal('password_confirm');}, 
             error_code: 'passnotmatch'}
            ],


          onChange: [
            'required', 
            {name:'match', testval: () => { return this.getVal('password_confirm'); }, 
             after:['password_confirm;onPassChange'], error_code: 'passnotmatch' }
             ],

          onPassConfirmChange: [
            'required',
             {name:'confirmCheck',
             testval: () => { return this.getVal('password_confirm');},error_code: 'passnotmatch' }
             ],

          defaultSettings: [
            {name:'minlength',testval:5}, 
            'required', 
            {name:'match',testval: () => { return this.getVal('password_confirm');}, 
             error_code: 'passnotmatch', after:['password_confirm;defaultSettings'] }
            ],

        },




        password_confirm: {
          onBlur: [
            {name:'match',
            testval: () => { return this.getVal('password'); }, error_code:'passnotmatch', after:['password;onBlur'] },
            {name:'minlength',testval:5}, 
            'required',
            ],

          onChange: [
            'required', 
            { name:'includes',testval: () => { return this.getVal('password');}, 
            after:['password;onPassConfirmChange'], error_code: 'passnotmatch' }
            ], 

          onPassChange: [
            {name:'match',testval: () => { return this.getVal('password');}, error_code:'passnotmatch' }
            ],

          defaultSettings: [
            {name:'minlength',testval:5}, 
            'required', 
            {name:'match',testval: () => { return this.getVal('password');}, 
             error_code: 'passnotmatch', after:['password;defaultSettings']}
            ],

      }
  }

}

  this.handleChange = this.handleChange.bind(this);
  this.getHelperText = this.getHelperText.bind(this);
  this.getVal = this.getVal.bind(this);
}

  login = () => {

      this.props.doLogin();

  };

  getVal = (fieldName) => {

    if(!this.state) return;
    return this.state[fieldName];

  }



  handleChange = (vprofile) => event => {

      if(!event) return;

      var tvalue = event.target.value;
      var tname = event.target.name;
      var event_type = event.type == 'blur' ? 'onBlur' : 'onChange';
      var doValidate;
      var isDirty = false;

      var tobj = {};
      tobj.value = tvalue;
      tobj.name = tname;


      var fc = this.state.fieldConfig[tname];
      if(!vprofile) vprofile = event_type;
      var vrules = fc[vprofile];

      if(event_type === 'onBlur') { 
          // this.setState({fieldConfig:{ ['tname']:{ isDirty: true  }  }}, 
          // () => { doValidate() }); 
          isDirty: true;
        }
      
      else {

            this.setState({ [tname]: tvalue }, () => { doValidate() });
        }

      function doValidate() {

        let vresult = validation.validate(event_type, vrules, tobj);
        this.setState({ [tobj.name+'Errors']: vresult.errors });

        if(vresult.vafter.length > 0) {

          for(var i = 0; i < vresult.vafter.length; i++) {

            let ttobj = {}
            let vinfo = vresult.vafter[i];
            ttobj.name = vinfo.split(";")[0];
            let eevent_type = vinfo.split(";")[1];
            ttobj.value = this.state[ttobj.name];
            let vvrules = this.state.fieldConfig[ttobj.name][eevent_type];
            let vvresult = validation.validate(eevent_type, vvrules, ttobj);
            this.setState({ [ttobj.name+'Errors']: vvresult.errors });
          }
      }


      }

}


  getHelperText = (fieldName) => {

    let errors = this.state[fieldName+'Errors'];
    if(!errors || errors.length === 0) return ' ';


    return validation.get_error_message(errors[0].error_code || errors[0].vname);

  }


  handleSubmit = (formFields) => {

    const fc = this.state.fieldConfig;
    const error_data = validation.validateForm(fc, formFields, this.state.password);

   if(error_data.count > 0) {

    this.setState({...error_data.errorsForFields}, () => {alert('form has ' +error_data.count+ ' errors' + 'will not post'); });

      
    } else {

      //implement authentication
      this.login();

    }

}

 

  render() {


    const {classes} = this.props;

 


    let auth = this.props.isAuthenticated;

    if (auth) {

      return (<Redirect to='/' />);

    }


    const fc = this.state.fieldConfig;
    const formFields = [

          <TextField key={'email'}
            id="email"
            label="E-mail"
            name="email"
            InputLabelProps={{shrink: true, className: classes.bootstrapFormLabel}}
            className={classes.textField}
            value={this.state.email}
            FormHelperTextProps={{ classes: { root: classes.helperTextRoot, error: classes.helperTextError  } }}
            helperText = { this.getHelperText('email')}
            onChange={this.handleChange()}
            onBlur={this.handleChange()}
            margin="normal"
            error={this.state.emailErrors.length > 0}
            InputProps={{
              disableUnderline: true,
            classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
              error: classes.textfieldError,
            },  
             }} />,

            <TextField key={'password'}
            id="password-input"
            label="Password"
            name="password"
            InputLabelProps={{shrink: true, className: classes.bootstrapFormLabel}}
            className={classes.textField}
            type="password"
            value={this.state.password}
            FormHelperTextProps={{ classes: { root: classes.helperTextRoot, error: classes.helperTextError  } }}
            helperText = {this.getHelperText('password')}
            onChange={this.handleChange()}
            onBlur={this.handleChange()}
            error={this.state.passwordErrors.length > 0}
            autoComplete="current-password"
            margin="normal" 
            InputProps={{
              disableUnderline: true,
            classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
              error: classes.textfieldError
            },  
             }} />,


            <TextField key={'password_confirm'}
            id="password-confirm-input"
            label="Confirm password"
            name="password_confirm"
            InputLabelProps={{shrink: true, className: classes.bootstrapFormLabel}}
            className={classes.textField}
            type="password"
            value={this.state.password_confirm}
            FormHelperTextProps={{ classes: { root: classes.helperTextRoot, error: classes.helperTextError  } }}
            helperText = {this.getHelperText('password_confirm')}
            onChange={this.handleChange(fc['password_confirm'].defaultSettings)}
            onBlur={this.handleChange(fc['password_confirm'].defaultSettings)}
            error={this.state.password_confirmErrors.length > 0}
            autoComplete="current-password"
            margin="normal" 
            InputProps={{
              disableUnderline: true,
            classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
              error: classes.textfieldError
            },  
             }} />

    ];


    return (
      <div className="loginWrapper">


            <form className={classes.container} noValidate autoComplete="off">


              {formFields}


          <Button disableRipple={true} onClick={ () => { this.handleSubmit(formFields) }} variant="outlined" className={classes.button}>
            Submit
          </Button>


            </form>

            <div style={{textAlign: 'center', paddingTop: '20px'}}>
            <p>Already have an account ? <Link className={classes.linkBorder} to="/login">Log&#45;In</Link></p>
            <p>Forgot password ? <Link className={classes.linkBorder} to="/passreset">Reset password</Link></p>
            </div>



        
      </div>
    );
  }
}


export default withStyles(styles)(SignUp);





import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

// import validators from '../../../utils/validation';
import validation from '../../../validation/validation';


import {withStyles} from '@material-ui/core/styles';



const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 185,
    margin: '0 auto',
    paddingTop: '20%'
  },
  textField: {
    width: 185,
  },

    bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: 20,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: '#cc2200',
    border: '1px solid #fff',
    fontSize: 16,
    height:'26px',
    color:'#fff',
    padding: '10px 12px',
    '&:focus': {
      borderWidth: '2px',
      padding: '9px 11px'
    },
  },
  bootstrapFormLabel: {
    fontSize: 19,
    color:'#fff !important',
  },
  button: {

    borderColor:'#fff',
    color:'white',
    marginTop:'15px',
    margin: '0 auto'

  },

  textfieldError: {
    '&>input': {

      backgroundColor: 'white',
      color: 'red',
    }
  },

  linkBorder: {

    color: '#fff !important',
    border: '1px solid #ea4527',
    borderRadius: 4,
    padding: '2px 4px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.23)'
    }
  },

  helperTextRoot: {

      padding: '2px 3px 2px 3px',
      visibility: 'hidden',
      borderRadius: '2px',
      color: '#fff !important',
      backgroundColor: 'red',
    },

    helperTextError: {
      visibility: 'visible',
    }

 
}





class SignUp extends React.Component {

constructor() {

super();

  this.state = {

      password: '',
      password_confirm: '',
      email: '',
      test: '',

      emailErrors: [],
      passwordErrors: [],
      password_confirmErrors: [],
      testErrors: [],

      formFieldNames:[],

      fieldConfig: {

        email: {
          onBlur: ['email', 'required'],
          onChange: ['required']
        },

        password: {

          onBlur: [
            {name:'minlength',testval:5}, 
            'required', 
            {name:'match',testval: () => { return this.getVal('password_confirm');}, 
             error_code: 'passnotmatch'}
            ],


          onChange: [
            'required', 
            {name:'match', testval: () => { return this.getVal('password_confirm'); }, 
             after:['password_confirm;onPassChange'], error_code: 'passnotmatch' }
             ],

          onPassConfirmChange: [
            'required',
             {name:'confirmCheck',
             testval: () => { return this.getVal('password_confirm');},error_code: 'passnotmatch' }
             ],

          defaultSettings: [
            {name:'minlength',testval:5}, 
            'required', 
            {name:'match',testval: () => { return this.getVal('password_confirm');}, 
             error_code: 'passnotmatch', after:['password_confirm;defaultSettings'] }
            ],

        },




        password_confirm: {
          onBlur: [
            {name:'match',
            testval: () => { return this.getVal('password'); }, error_code:'passnotmatch', after:['password;onBlur'] },
            {name:'minlength',testval:5}, 
            'required',
            ],

          onChange: [
            'required', 
            { name:'includes',testval: () => { return this.getVal('password');}, 
            after:['password;onPassConfirmChange'], error_code: 'passnotmatch' }
            ], 

          onPassChange: [
            {name:'match',testval: () => { return this.getVal('password');}, error_code:'passnotmatch' }
            ],

          defaultSettings: [
            {name:'minlength',testval:5}, 
            'required', 
            {name:'match',testval: () => { return this.getVal('password');}, 
             error_code: 'passnotmatch', after:['password;defaultSettings']}
            ],

      }
  }

}

  this.handleChange = this.handleChange.bind(this);
  this.getHelperText = this.getHelperText.bind(this);
  this.getVal = this.getVal.bind(this);
}

  login = () => {

      this.props.doLogin();

  };

  getVal = (fieldName) => {

    if(!this.state) return;
    return this.state[fieldName];

  }



  handleChange = (vrules) => event => {

      if(!event) return;

      var tvalue = event.target.value;
      var tname = event.target.name;
      var event_type = event.type;

      var tobj = {};
      tobj.value = tvalue;
      tobj.name = tname;

      this.setState({
        [tname]: tvalue,
      }, () => { 

        let vresult = validation.validate(event_type, vrules, tobj);
        this.setState({ [tobj.name+'Errors']: vresult.errors });

        if(vresult.vafter.length > 0) {

          for(var i = 0; i < vresult.vafter.length; i++) {

            let ttobj = {}
            let vinfo = vresult.vafter[i];
            ttobj.name = vinfo.split(";")[0];
            let eevent_type = vinfo.split(";")[1];
            ttobj.value = this.state[ttobj.name];
            let vvrules = this.state.fieldConfig[ttobj.name][eevent_type];
            let vvresult = validation.validate(eevent_type, vvrules, ttobj);
            this.setState({ [ttobj.name+'Errors']: vvresult.errors });
          }
      }



    });
}


  getHelperText = (fieldName) => {

    let errors = this.state[fieldName+'Errors'];
    if(!errors || errors.length === 0) return ' ';


    return validation.get_error_message(errors[0].error_code || errors[0].vname);

  }


  handleSubmit = (formFields) => {

    const fc = this.state.fieldConfig;
    const error_data = validation.validateForm(fc, formFields, this.state.password);

   if(error_data.count > 0) {

    this.setState({...error_data.errorsForFields}, () => {alert('form has ' +error_data.count+ ' errors' + 'will not post'); });

      
    } else {

      //implement authentication
      this.login();

    }

}

 

  render() {


    const {classes} = this.props;

 


    let auth = this.props.isAuthenticated;

    if (auth) {

      return (<Redirect to='/' />);

    }


    const fc = this.state.fieldConfig;
    const formFields = [

          <TextField key={'email'}
            id="email"
            label="E-mail"
            name="email"
            InputLabelProps={{shrink: true, className: classes.bootstrapFormLabel}}
            className={classes.textField}
            value={this.state.email}
            FormHelperTextProps={{ classes: { root: classes.helperTextRoot, error: classes.helperTextError  } }}
            helperText = { this.getHelperText('email')}
            onChange={this.handleChange(fc['email'].onChange)}
            onBlur={this.handleChange(fc['email'].onBlur )}
            margin="normal"
            error={this.state.emailErrors.length > 0}
            InputProps={{
              disableUnderline: true,
            classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
              error: classes.textfieldError,
            },  
             }} />,

            <TextField key={'password'}
            id="password-input"
            label="Password"
            name="password"
            InputLabelProps={{shrink: true, className: classes.bootstrapFormLabel}}
            className={classes.textField}
            type="password"
            value={this.state.password}
            FormHelperTextProps={{ classes: { root: classes.helperTextRoot, error: classes.helperTextError  } }}
            helperText = {this.getHelperText('password')}
            onChange={this.handleChange(fc['password'].defaultSettings)}
            onBlur={this.handleChange(fc['password'].defaultSettings)}
            error={this.state.passwordErrors.length > 0}
            autoComplete="current-password"
            margin="normal" 
            InputProps={{
              disableUnderline: true,
            classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
              error: classes.textfieldError
            },  
             }} />,


            <TextField key={'password_confirm'}
            id="password-confirm-input"
            label="Confirm password"
            name="password_confirm"
            InputLabelProps={{shrink: true, className: classes.bootstrapFormLabel}}
            className={classes.textField}
            type="password"
            value={this.state.password_confirm}
            FormHelperTextProps={{ classes: { root: classes.helperTextRoot, error: classes.helperTextError  } }}
            helperText = {this.getHelperText('password_confirm')}
            onChange={this.handleChange(fc['password_confirm'].defaultSettings)}
            onBlur={this.handleChange(fc['password_confirm'].defaultSettings)}
            error={this.state.password_confirmErrors.length > 0}
            autoComplete="current-password"
            margin="normal" 
            InputProps={{
              disableUnderline: true,
            classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
              error: classes.textfieldError
            },  
             }} />

    ];


    return (
      <div className="loginWrapper">


            <form className={classes.container} noValidate autoComplete="off">


              {formFields}


          <Button disableRipple={true} onClick={ () => { this.handleSubmit(formFields) }} variant="outlined" className={classes.button}>
            Submit
          </Button>


            </form>

            <div style={{textAlign: 'center', paddingTop: '20px'}}>
            <p>Already have an account ? <Link className={classes.linkBorder} to="/login">Log&#45;In</Link></p>
            <p>Forgot password ? <Link className={classes.linkBorder} to="/passreset">Reset password</Link></p>
            </div>



        
      </div>
    );
  }
}


export default withStyles(styles)(SignUp);







import validators from './validators';
import error_messages from './error_messages';




class validation {

  // constructor() {

  //  this.validate = this.validate.bind(this);
  // }

  static get_error_message = (vname) => {

    return error_messages[vname];
  }



  static validate = (event_type, vrules, tobj) => {

    if(!vrules) return;

    let tvalue, tname;
    let errors = [];
    let vafter = [];

         // var tobj = tobj || event.target || event ;

         tvalue = tobj.value;
         tname = tobj.name;


         for(var i = 0; i < vrules.length; i++) {

          let valid = false;
          let vruleName;
          let vrule = vrules[i];
          let error_code;

          if(typeof vrule === 'object') {

            valid = validators[vrule.name](tvalue, vrule.testval, event_type);
            vruleName = vrule.name;
            error_code = vrule.error_code || null;
            if(vrule.after) vafter = vafter.concat(vrule.after);

          } else {

            valid = validators[vrule](tvalue);
            vruleName = vrule;
          }

          if(!valid) {

            errors.push({ vname: vruleName, error_code: error_code });
          }

         }

         return {errors: errors, vafter: vafter}

        }



        static validateForm = (fc, formFields , pass) => {

          var error_data = {count:0 , errorsForFields: []}

          for(var i = 0; i < formFields.length; i++) {

            let el = formFields[i];
            let fname = el.props.name;

            let tobj = {name: el.props.name, value: el.props.value}

            if(el.props.name === 'password') {

              tobj.value = pass || null;
            }

            var fieldErrors = validation.validate('blur', fc[fname].onBlur, tobj).errors;

            error_data.errorsForFields[fname+'Errors'] = fieldErrors;

            error_data.count += fieldErrors.length;
          }

          return error_data;
        }



       }



       export default validation;