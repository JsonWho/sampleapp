import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ValidationHOC from '../../../validation/ValidationHOC';
import LoginForm from './LoginForm';






const LoginFormWithValidation = ValidationHOC(LoginForm);


class Login extends React.Component {

constructor() {

super();

this.login = this.login.bind(this);


}

 login = () => {

  		this.props.doLogin();

  };

 

  render() {



    const { from } = 
    this.props.location.state || { from: { pathname: "/" } };


    let auth = this.props.isAuthenticated;

    if (auth) {

      return (<Redirect to={from} />);

    }




    return (

    		<LoginFormWithValidation doLogin={this.login} />
    );

  }
}


export default Login;