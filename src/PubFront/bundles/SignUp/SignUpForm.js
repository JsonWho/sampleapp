import { Route, Link, Switch } from 'react-router-dom';
import React, { Component } from 'react';


import WhiteBorderTextField from '../../../UIcomponents/WhiteBorderTextField';
import WhiteBorderLink from '../../../UIcomponents/WhiteBorderLink';
import WhiteBorderButton from '../../../UIcomponents/WhiteBorderButton';

class SignUpForm extends React.Component {

  constructor() {

    super();

    this.state = {

      signUpStep: 1,
      userType: null,


      }
    }


  


  static getFieldData() {

    const fieldData = 
      { 


      fieldNames: ['email','password','password_confirm'],


      fieldConfig: {

        email: [
        {name:'required'},
        {name:'email', event_type:'onBlur'}
        ],

        password: [
        {name:'required'}, 
        {name:'minlength',testval:5, event_type:'onBlur'},
        // {name:'includes',testval: () => { return this.props.getVal('password_confirm');}, 
        // error_code: 'passnotmatch', event_type:'onChange' }, 
        {name:'match', testval:'password_confirm', 
        error_code: 'passnotmatch', after:['password_confirm'], event_type:'onChange', event_strict: false }
        ],

        //event_strict makes sure the validation directive is only used on its event_type, irrespective if field is already dirty.
        //once field is dirty all validation directives/rules run, irrespective of event_type, unless they have event_strict set to true.
        //more advanced implementation could include fetching dirty state of comparison field

        password_confirm:  [
        {name:'required'},
        {name:'minlength',testval:5, event_type:'onBlur'},  
        {name:'includes',testval:'password', 
        error_code: 'passnotmatch', event_type:'onChange' },
        {name:'match',testval:'password', 
        error_code: 'passnotmatch', after:['password'], event_type:'onBlur', event_strict: false }

        ]


      }
    }


      return fieldData;
}


  componentWillMount() {


  }




  render() {


    const {classes} = this.props;

    let content = null;


    return (


    <div>
    {this.props.accountType}
    <form className="loginBox" noValidate autoComplete="off">





          <WhiteBorderTextField key="email"
          hasErrors={this.props.hasErrors} 
          getHelperText={this.props.getHelperText} 
          handleInputEvent={this.props.handleInputEvent}
          value={this.props.email} 
          name="email" 
          type="text" />



          <WhiteBorderTextField key="password"
          hasErrors={this.props.hasErrors} 
          getHelperText={this.props.getHelperText} 
          handleInputEvent={this.props.handleInputEvent} 
          name="password" 
          value={this.props.password} 
          type="password" />


          <WhiteBorderTextField key="password_confirm"
          hasErrors={this.props.hasErrors} 
          getHelperText={this.props.getHelperText} 
          handleInputEvent={this.props.handleInputEvent} displayName="confirm password"
          name="password_confirm"
          value={this.props.password_confirm} 
          type="password" />






      
      <WhiteBorderButton onClick={() => { this.props.handleSubmit(SignUpForm.getFieldData().fieldNames) }}>
      Submit
      </WhiteBorderButton>


      </form>

      <div style={{textAlign: 'center', paddingTop: '20px'}}>
      <p>Already have an account ? <WhiteBorderLink to="/login" text="Log&#45;In" /></p>
      <p>Forgot password ? <WhiteBorderLink to="/resetpassword" text="Reset password" /> </p>
      </div>

      </div> 


      );
  }
}


export default SignUpForm;