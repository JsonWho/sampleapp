import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link, Switch, Redirect, withRouter  } from 'react-router-dom';
import './App.css'
import PubFront from './PubFront/PubFront';

import UserPanel from './UserPanel/UserPanel';
import Manager from './Manager/Manager';
import NewAdWizard from './Manager/bundles/NewAdWizard/NewAdWizard';

import theme from './PubFront/Themes/RedTheme'

import './PubFront/bundles/Login/login.css';
import LoginDialog from './PubFront/bundles/Login/LoginDialog';
import SignUpDialog from './PubFront/bundles/SignUp/SignUpDialog';
import ResetPasswordDialog from './PubFront/bundles/resetpassword/ResetPasswordDialog';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';








class App extends Component {


constructor(props) {
      super(props);


     this.state = { 


            firstPath: '',
            isAuthenticated: true,
            renderLoginDialog: false

      }


      this.toggleLoginState = this.toggleLoginState.bind(this);
      this.handleDialogClose = this.handleDialogClose.bind(this);
      this.doLogin = this.doLogin.bind(this);
      this.doResetPassword = this.doResetPassword.bind(this);
}


 toggleLoginState = () => {

      if(!this.state.isAuthenticated) { this.props.history.push('/login',{ from: this.props.location.pathname }); }

      else {
        this.setState({isAuthenticated: false});
        //implement logout method
      } 

 }



   doLogin = () => {

    this.setState({isAuthenticated: true});

    //implement login

  }


  doResetPassword = () => {

    alert('New pass has been E-mailed to you');

  }

componentDidMount() {

  this.setState({firstPath: this.props.location.pathname });

}


  handleDialogClose = () => {

    // this.setState({ renderLoginDialog: false});

    let invalid_urls = ['/myaccount','/login'];

    let invalid = invalid_urls.find((inv) => 

        { let idx = this.state.firstPath.indexOf(inv);
           return idx !== -1;
       });

    if(!invalid)

      { this.props.history.goBack(); }

      else {

        this.props.history.push('/',null);
        this.setState({firstPath: '/'});
      }

  }



  render() {

   
   const isAuthenticated = this.state.isAuthenticated;

    const PrivateRoute = ({ component: Component, ...rest }) => (


      <Route {...rest} render={ (props) => {  return ( isAuthenticated ? (<Component {...props} />) : 
             ( <Redirect to={{ pathname: "/login", state: {from: props.location} }}/> )); }
      } />


    );



    return (
    <MuiThemeProvider theme={theme}>
  
      <Switch>

        <Route path="/newadwizard" render={ (props) => {  return ( isAuthenticated ? <Manager {...props} /> : 
          <Redirect to={{ pathname: "/login", state: {from: props.location} }}/> ); }} />


       <Route path="/manager" render={ (props) => {  return ( isAuthenticated ? <Manager {...props} /> : 
          <Redirect to={{ pathname: "/login", state: {from: props.location} }}/> ); }} />


       <PrivateRoute path="/userpanel"  component={UserPanel}/>

       
       <Route path="/"  render={(props) => 
       (<PubFront toggleLoginState={this.toggleLoginState} isAuthenticated={this.state.isAuthenticated} {...props} />)  }/>

      </Switch>



        
        <Switch>
        <Route exact path="/login" render={(props) => 

       (<LoginDialog isAuthenticated={this.state.isAuthenticated} renderLoginDialog={true} handleLoginDialogClose={ this.handleDialogClose } doLogin={this.doLogin} location={props.location} />)

        }/>


        <Route path="/signup" render={(props) => 

       (<SignUpDialog isAuthenticated={this.state.isAuthenticated} match={props.match} renderSignUpDialog={true} handleSignUpDialogClose={ this.handleDialogClose } doLogin={this.doLogin} />)

        }/>



        <Route exact path="/resetpassword" render={(props) => 

       (<ResetPasswordDialog isAuthenticated={this.state.isAuthenticated} renderResetPasswordDialog={true} handleResetPasswordDialogClose={ this.handleDialogClose } doResetPass={this.doResetPassword} />)

        }/>
        </Switch>





  </MuiThemeProvider>

    );
  }
}

export default withRouter(App);




 