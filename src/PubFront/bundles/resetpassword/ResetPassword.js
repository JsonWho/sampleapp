import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ValidationHOC from '../../../validation/ValidationHOC';
import ResetPasswordForm from './ResetPasswordForm';






const ResetPasswordFormWithValidation = ValidationHOC(ResetPasswordForm);


class ResetPassword extends React.Component {

constructor() {

super();

this.doResetPass = this.doResetPass.bind(this);


}

 doResetPass = () => {

  		this.props.doResetPass();

  };

 

  render() {


    // const { from } = 
    // this.props.location.state || { from: { pathname: "/" } };


    let auth = this.props.isAuthenticated;

    // if (auth) {

    //   return (<Redirect to={from} />);

    // }




    return (

    		<ResetPasswordFormWithValidation doResetPass={this.doResetPass} />
    );

  }
}


export default ResetPassword;