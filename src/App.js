import React, { Component } from 'react';
import './App.css';
import Auth from './adapters/Auth'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import ModalSignupForm from './components/ModalSignupForm'
import MacrosContainer from './components/MacrosContainer'

import { Route, Redirect } from 'react-router-dom'
import authorize from './authorize'

class App extends Component {

  state = {
    currentUser: {},
    isLoggedIn: localStorage.getItem('jwt')
  }


  loginUser = (userParams) => {
    Auth.login(userParams)
      .then(user => {
        this.setState({
          currentUser: user,
          isLoggedIn: true
        })
        localStorage.setItem('jwt', user.jwt)
      })
  }

  signupUser = (userParams) => {
    Auth.signup(userParams)
      .then(user => {
        this.setState({
          currentUser: user,
          isLoggedIn: true
        })
        localStorage.setItem('jwt', user.jwt)
      })
  }


  handleButtonClick = () => {
    Auth.me().then(user => {

    })

  }

  handleLogOut = () => {
    Auth.logOut();
    this.setState({
      isLoggedIn: false
    })

  }

  // we want if i click login I should login duh but also I should be redirected 
  // now what does that mean  well a couple things first it means that if im logged in I should never see the login screen
  // if im not logged in I should always see the login screen
  // we may have to use a Higher Order Component 
  // alternatively we could do better routing 


  render() {


    return (
      <div>
        <Route strict path="/" render={() => !this.state.isLoggedIn ? <Redirect to="/login"/> : null }/>
        <Route path="/home" render={() => <MacrosContainer currentUser={this.state.currentUser} handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/> }/>
        <Route path="/login" render={() => !this.state.isLoggedIn ? <LoginForm onLogin={this.loginUser} onSignup={this.signupUser}/> : <Redirect to="/home"/>} />
      </div>


      
    );
  }
}



export default App;