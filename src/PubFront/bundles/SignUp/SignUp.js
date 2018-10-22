import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';


import WhiteBorderLink from '../../../UIcomponents/WhiteBorderLink';


import ValidationHOC from '../../../validation/ValidationHOC';
import SignUpForm from './SignUpForm';
import './signup.css';




const SignUpFormWithValidation = ValidationHOC(SignUpForm);

class SignUp extends React.Component {

constructor() {

super();

  this.state = {

      
}

this.login = this.login.bind(this);

}

  login = () => {

      this.props.doLogin();

  };

  componentDidMount() {

  }

 

  render() {


    const {classes} = this.props;
    const fc = this.state.fieldConfig;
 


    let auth = this.props.isAuthenticated;

    if (auth) {

      return (<Redirect to='/' />);

    }



    let ActypeSelector = ({match}) =>
      
      (<div className="signupStepOne">
  
        <h4>What kind of account do you need ?</h4>


        <Link to={`${match.url}/form/regular`}>Standard User (Not posting ads)</Link>

        <Link to={`${match.url}/form/serviceprovider`}>Service provider (I want to post ads)</Link>

 

      </div>);



    
    return (


            <div className="loginWrapper">

              

              <Route exact path={'/signup'} component={ActypeSelector} />

              <Route path={'/signup/form/:accounttype'} render={({match}) => ( <SignUpFormWithValidation doLogin={this.login} accountType={match.params.accounttype} /> ) }/>



            </div>



    );
  }
}


export default SignUp;