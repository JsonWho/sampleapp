import React, { Component } from 'react';
import WhiteBorderTextField from '../../../UIcomponents/WhiteBorderTextField';
import WhiteBorderLink from '../../../UIcomponents/WhiteBorderLink';
import WhiteBorderButton from '../../../UIcomponents/WhiteBorderButton';

class LoginForm extends React.Component {


  static getFieldData() {

    const fieldData = 
      { 


      fieldConfig: {

        email: [
        {name:'required'},
        {name:'email', event_type:'onBlur'}
        ],

        password: [
        {name:'required'}, 
        {name:'minlength',testval:5, event_type:'onBlur'},
        ]

        //event_strict makes sure the validation directive is only used on its event_type, irrespective if field is already dirty.
        //once field is dirty all validation directives/rules run, irrespective of event_type, unless they have event_strict set to true.



      },

      fieldNames: ['email','password']
      }

    return fieldData;
}




  render() {


    const {classes} = this.props;


    return (

      <div className="loginWrapper">


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


              <WhiteBorderButton onClick={() => { this.props.handleSubmit(LoginForm.getFieldData().fieldNames) }}>
                Login
              </WhiteBorderButton>


            </form>

            <div style={{textAlign: 'center', paddingTop: '20px'}}>
            <p>Don&apos;t have an account ? <WhiteBorderLink to="/signup" text="Sign&#45;Up" /></p>
            <p>Forgot password ? <WhiteBorderLink to="/resetpassword" text="Reset password" /> </p>
            </div>



        
      </div>
    );
  }
}


export default LoginForm;