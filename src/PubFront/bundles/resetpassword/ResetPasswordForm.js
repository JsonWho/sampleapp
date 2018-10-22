import React, { Component } from 'react';
import WhiteBorderTextField from '../../../UIcomponents/WhiteBorderTextField';
import WhiteBorderLink from '../../../UIcomponents/WhiteBorderLink';
import WhiteBorderButton from '../../../UIcomponents/WhiteBorderButton';

class ResetPasswordForm extends React.Component {

  static getFieldData() {

    const fieldData = 
      { 



        fieldConfig: {

            email: [
            {name:'required'},
            {name:'email', event_type:'onBlur'}
            ],

          },

          fieldNames: ['email']

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
                  placeholder="Enter E-mail"
                  getHelperText={this.props.getHelperText} 
                  handleInputEvent={this.props.handleInputEvent}
                  value={this.props.email} 
                  name="email" 
                type="text" />


              <WhiteBorderButton onClick={() => { this.props.handleSubmit(ResetPasswordForm.getFieldData().fieldNames) }}>
                Reset
              </WhiteBorderButton>


            </form>

            <div style={{textAlign: 'center', paddingTop: '20px'}}>
            <p>Already have an account ? <WhiteBorderLink to="/login" text="Log&#45;in" /></p>
            <p>Don&apos;t have an account ? <WhiteBorderLink to="/signup" text="Sign-Up" /> </p>
            </div>



        
      </div>
    );
  }
}


export default ResetPasswordForm;